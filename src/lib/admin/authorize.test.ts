import { describe, expect, it } from "vitest";
import {
  evaluateAdminAccess,
  validateAdminRequestOrigin,
} from "@/lib/admin/api";
import type { SessionUser } from "@/lib/auth/session";

function requestLike(input: {
  method: string;
  origin?: string | null;
  nextOrigin?: string;
}) {
  const headers = new Map<string, string>();
  if (input.origin) headers.set("origin", input.origin);
  return {
    method: input.method,
    headers: {
      get(name: string) {
        return headers.get(name.toLowerCase()) ?? null;
      },
    },
    nextUrl: { origin: input.nextOrigin || "https://faizzab.com" },
  };
}

describe("validateAdminRequestOrigin", () => {
  it("rejects cross-origin state-changing requests", () => {
    expect(
      validateAdminRequestOrigin(
        requestLike({
          method: "POST",
          origin: "https://evil.example",
          nextOrigin: "https://faizzab.com",
        })
      )
    ).toBe("invalid_origin");
  });

  it("rejects mutating requests without an Origin header", () => {
    expect(
      validateAdminRequestOrigin(
        requestLike({
          method: "PATCH",
          origin: null,
          nextOrigin: "https://faizzab.com",
        })
      )
    ).toBe("invalid_origin");
  });

  it("allows same-origin authenticated mutations", () => {
    expect(
      validateAdminRequestOrigin(
        requestLike({
          method: "POST",
          origin: "https://faizzab.com",
          nextOrigin: "https://faizzab.com",
        })
      )
    ).toBe("ok");
  });

  it("allows GET without Origin", () => {
    expect(
      validateAdminRequestOrigin(
        requestLike({
          method: "GET",
          origin: null,
          nextOrigin: "https://faizzab.com",
        })
      )
    ).toBe("ok");
  });
});

describe("evaluateAdminAccess", () => {
  const editor: SessionUser = {
    id: "1",
    name: "Editor",
    email: "editor@faizzab.com",
    role: "CONTENT_EDITOR",
    isActive: true,
  };
  const superAdmin: SessionUser = {
    id: "2",
    name: "Admin",
    email: "admin@faizzab.com",
    role: "SUPER_ADMIN",
    isActive: true,
  };

  it("rejects unauthenticated access", () => {
    expect(evaluateAdminAccess(null)).toBe("unauthorized");
  });

  it("rejects Content Editor for Super Admin-only actions", () => {
    expect(evaluateAdminAccess(editor, { superAdminOnly: true })).toBe("forbidden");
  });

  it("allows Super Admin for Super Admin-only actions", () => {
    expect(evaluateAdminAccess(superAdmin, { superAdminOnly: true })).toBe("ok");
  });

  it("allows Content Editor for ordinary Admin actions", () => {
    expect(evaluateAdminAccess(editor)).toBe("ok");
  });
});
