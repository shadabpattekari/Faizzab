import { describe, expect, it, vi } from "vitest";

describe("admin login rate-limit fail-closed contract", () => {
  it("treats unavailable rate-limit checks as denied when failClosed is requested", async () => {
    vi.resetModules();
    vi.doMock("@/lib/db/prisma", () => ({
      prisma: {
        rateLimitRecord: {
          findUnique: vi.fn().mockRejectedValue(new Error("db down")),
          create: vi.fn(),
          update: vi.fn(),
          deleteMany: vi.fn(),
        },
      },
    }));

    const { checkRateLimit } = await import("@/lib/rate-limit");
    const open = await checkRateLimit({
      key: "lead:test",
      limit: 5,
      windowMs: 60_000,
      failClosed: false,
    });
    expect(open.allowed).toBe(true);
    expect(open.unavailable).toBe(true);

    const closed = await checkRateLimit({
      key: "admin-login:test",
      limit: 5,
      windowMs: 60_000,
      failClosed: true,
    });
    expect(closed.allowed).toBe(false);
    expect(closed.unavailable).toBe(true);
  });
});
