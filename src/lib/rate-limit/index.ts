import { prisma } from "@/lib/db/prisma";

/**
 * Database-backed rate limiting suitable for shared hosting (no Redis).
 */
export async function checkRateLimit(options: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<{ allowed: boolean; remaining: number }> {
  const { key, limit, windowMs } = options;
  const now = new Date();
  const windowStart = new Date(Math.floor(now.getTime() / windowMs) * windowMs);
  const expiresAt = new Date(windowStart.getTime() + windowMs);

  try {
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
    // Fail open lightly if rate-limit table unavailable — still rely on Zod + honeypot
    return { allowed: true, remaining: limit };
  }
}

export async function cleanupExpiredRateLimits(): Promise<void> {
  try {
    await prisma.rateLimitRecord.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  } catch {
    // ignore
  }
}
