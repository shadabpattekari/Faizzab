import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  generateToken,
  getSessionUser,
  hashPassword,
  hashToken,
  validatePasswordStrength,
  verifyPassword,
} from "@/lib/auth/session";
import { writeAuditLog } from "@/lib/auth/audit";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validation/forms";
import { sendPasswordResetEmail } from "@/lib/email/mailer";
import { checkRateLimit } from "@/lib/rate-limit";
import { absoluteUrl, getClientIp } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const strength = validatePasswordStrength(parsed.data.newPassword);
  if (strength) {
    return NextResponse.json({ ok: false, error: strength }, { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const ok = await verifyPassword(parsed.data.currentPassword, dbUser.passwordHash);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Current password is incorrect." }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
  await prisma.session.deleteMany({ where: { userId: user.id } });

  await writeAuditLog({
    action: "password_change",
    actorId: user.id,
    actorEmail: user.email,
    ipAddress: getClientIp(request.headers),
  });

  return NextResponse.json({ ok: true });
}

export async function PUT(request: NextRequest) {
  // forgot password
  const ip = getClientIp(request.headers) || "unknown";
  const rate = await checkRateLimit({
    key: `forgot-password:${ip}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: true }); // do not reveal
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.isActive) {
    const token = generateToken(32);
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });
    await sendPasswordResetEmail(
      user.email,
      absoluteUrl(`/admin/reset-password?token=${token}`)
    );
    await writeAuditLog({
      action: "password_reset_requested",
      actorId: user.id,
      actorEmail: user.email,
      ipAddress: ip,
    });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: NextRequest) {
  // reset password with token
  const body = await request.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const strength = validatePasswordStrength(parsed.data.newPassword);
  if (strength) {
    return NextResponse.json({ ok: false, error: strength }, { status: 400 });
  }

  const tokenHash = hashToken(parsed.data.token);
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return NextResponse.json({ ok: false, error: "Reset link is invalid or expired." }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
    prisma.session.deleteMany({ where: { userId: record.userId } }),
  ]);

  const user = await prisma.user.findUnique({ where: { id: record.userId } });
  await writeAuditLog({
    action: "password_reset_completed",
    actorId: record.userId,
    actorEmail: user?.email,
    ipAddress: getClientIp(request.headers),
  });

  return NextResponse.json({ ok: true });
}
