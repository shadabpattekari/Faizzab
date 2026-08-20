import { createHash, randomBytes, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import type { Role, User } from "@prisma/client";

export const SESSION_COOKIE = "fz_session";
const SESSION_DAYS = 7;
const BCRYPT_ROUNDS = 12;

export const PASSWORD_RULES = {
  minLength: 12,
  requireUpper: true,
  requireLower: true,
  requireNumber: true,
  requireSpecial: true,
};

export function validatePasswordStrength(password: string): string | null {
  if (password.length < PASSWORD_RULES.minLength) {
    return `Password must be at least ${PASSWORD_RULES.minLength} characters.`;
  }
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include a number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must include a special character.";
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export type SessionUser = Pick<User, "id" | "name" | "email" | "role" | "isActive">;

export async function createSession(
  userId: string,
  meta?: { userAgent?: string; ipAddress?: string }
): Promise<string> {
  const token = generateToken(48);
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      userAgent: meta?.userAgent?.slice(0, 512),
      ipAddress: meta?.ipAddress?.slice(0, 64),
    },
  });

  return token;
}

export async function destroySession(token: string): Promise<void> {
  const tokenHash = hashToken(token);
  await prisma.session.deleteMany({ where: { tokenHash } });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true, isActive: true },
      },
    },
  });

  if (!session || session.expiresAt < new Date() || !session.user.isActive) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    }
    return null;
  }

  return session.user;
}

export function sessionCookieOptions(maxAgeSeconds: number) {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export function requireRole(user: SessionUser, allowed: Role[]): boolean {
  return allowed.includes(user.role);
}

export function isSuperAdmin(user: SessionUser): boolean {
  return user.role === "SUPER_ADMIN";
}
