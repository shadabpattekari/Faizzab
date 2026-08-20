import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  createSession,
  SESSION_COOKIE,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth/session";
import { writeAuditLog } from "@/lib/auth/audit";
import { loginSchema } from "@/lib/validation/forms";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";

const SESSION_SECONDS = 7 * 24 * 60 * 60;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers) || "unknown";
  const rate = await checkRateLimit({
    key: `admin-login:${ip}`,
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });

  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.isActive) {
    await writeAuditLog({
      action: "login_failed",
      actorEmail: email,
      ipAddress: ip,
      metadata: { reason: "user_not_found_or_inactive" },
    });
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    await writeAuditLog({
      action: "login_failed",
      actorId: user.id,
      actorEmail: user.email,
      ipAddress: ip,
      metadata: { reason: "bad_password" },
    });
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSession(user.id, {
    ipAddress: ip,
    userAgent: request.headers.get("user-agent") || undefined,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await writeAuditLog({
    action: "login",
    actorId: user.id,
    actorEmail: user.email,
    ipAddress: ip,
  });

  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(SESSION_SECONDS));
  return response;
}
