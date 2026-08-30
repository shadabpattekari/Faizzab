import { prisma } from "@/lib/db/prisma";

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** True when the limiter could not evaluate the request (DB/subsystem failure). */
  unavailable?: boolean;
};

/**
 * Database-backed rate limiting suitable for shared hosting (no Redis).
 *
 * Default mode fails open for public lead forms so temporary DB issues do not
 * block legitimate business enquiries (Zod + honeypot still apply).
 *
 * Use `failClosed: true` for Admin authentication so password guessing cannot
 * continue when the rate-limit subsystem is unavailable.
 */
export async function checkRateLimit(options: {
  key: string;
  limit: number;
  windowMs: number;
  failClosed?: boolean;
}): Promise<RateLimitResult> {
  const { key, limit, windowMs, failClosed = false } = options;
  const now = new Date();
  const windowStart = new Date(Math.floor(now.getTime() / windowMs) * windowMs);
  const expiresAt = new Date(windowStart.getTime() + windowMs);

  try {
    maybeCleanupExpiredRateLimits();

    const existing = await prisma.rateLimitRecord.findUnique({
      where: {
        key_windowStart: { key, windowStart },
      },
    });

    if (!existing) {
      await prisma.rateLimitRecord.create({
        data: { key, count: 1, windowStart, expiresAt },
      });
      return { allowed: true, remaining: limit - 1 };
    }

    if (existing.count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    await prisma.rateLimitRecord.update({
      where: { id: existing.id },
      data: { count: { increment: 1 } },
    });

    return { allowed: true, remaining: Math.max(0, limit - existing.count - 1) };
  } catch {
    if (failClosed) {
      return { allowed: false, remaining: 0, unavailable: true };
    }
    // Public lead forms: fail open lightly — Zod + honeypot still apply.
    return { allowed: true, remaining: limit, unavailable: true };
  }
}

/**
 * Opportunistic cleanup (~2% of rate-limit checks) so expired rows do not grow
 * indefinitely without a background worker or Redis.
 */
function maybeCleanupExpiredRateLimits(): void {
  if (Math.random() > 0.02) return;
  void cleanupExpiredRateLimits();
}

export async function cleanupExpiredRateLimits(): Promise<void> {
  try {
    await prisma.rateLimitRecord.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  } catch {
    // Cleanup must never break request handling.
  }
}
