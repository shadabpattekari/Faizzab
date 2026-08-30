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
import {
  GENERIC_LOGIN_FAILURE_MESSAGE,
  authFailureJson,
  isAccountCurrentlyLocked,
  nextFailedLoginState,
  type LoginAuditReason,
} from "@/lib/auth/login-security";

const SESSION_SECONDS = 7 * 24 * 60 * 60;

function failureResponse() {
  const failure = authFailureJson();
  return NextResponse.json(failure.body, { status: failure.status });
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers) || "unknown";
  const rate = await checkRateLimit({
    key: `admin-login:${ip}`,
    limit: 10,
    windowMs: 15 * 60 * 1000,
    failClosed: true,
  });

  if (!rate.allowed) {
    await writeAuditLog({
      action: "login_failed",
      ipAddress: ip,
      metadata: {
        reason: "RATE_LIMITED" satisfies LoginAuditReason,
        unavailable: Boolean(rate.unavailable),
      },
    });
    // Do not disclose whether this was quota exhaustion vs rate-limit subsystem failure.
    // Keep authentication failures generic to the browser.
    if (rate.unavailable) {
      return NextResponse.json(
        { ok: false, error: GENERIC_LOGIN_FAILURE_MESSAGE },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    await writeAuditLog({
      action: "login_failed",
      ipAddress: ip,
      metadata: { reason: "INVALID_REQUEST" satisfies LoginAuditReason },
    });
    return failureResponse();
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    await writeAuditLog({
      action: "login_failed",
      ipAddress: ip,
      metadata: { reason: "INVALID_REQUEST" satisfies LoginAuditReason },
    });
    return failureResponse();
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    await writeAuditLog({
      action: "login_failed",
      actorEmail: email,
      ipAddress: ip,
      metadata: { reason: "INVALID_CREDENTIALS" satisfies LoginAuditReason },
    });
    return failureResponse();
  }

  if (!user.isActive) {
    await writeAuditLog({
      action: "login_failed",
      actorId: user.id,
      actorEmail: user.email,
      ipAddress: ip,
      metadata: { reason: "ACCOUNT_INACTIVE" satisfies LoginAuditReason },
    });
    return failureResponse();
  }

  if (isAccountCurrentlyLocked(user.lockedUntil)) {
    await writeAuditLog({
      action: "login_blocked_locked",
      actorId: user.id,
      actorEmail: user.email,
      ipAddress: ip,
      metadata: {
        reason: "ACCOUNT_LOCKED" satisfies LoginAuditReason,
        lockedUntil: user.lockedUntil?.toISOString(),
      },
    });
    return failureResponse();
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    const state = nextFailedLoginState(user.failedLoginCount);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount: state.failedLoginCount,
        lockedUntil: state.lockedUntil,
      },
    });

    await writeAuditLog({
      action: state.shouldLock ? "login_lockout" : "login_failed",
      actorId: user.id,
      actorEmail: user.email,
      ipAddress: ip,
      metadata: {
        reason: state.shouldLock
          ? ("ACCOUNT_LOCKED" satisfies LoginAuditReason)
          : ("INVALID_CREDENTIALS" satisfies LoginAuditReason),
        failedLoginCount: state.nextCount,
        locked: state.shouldLock,
      },
    });

    return failureResponse();
  }

  const token = await createSession(user.id, {
    ipAddress: ip,
    userAgent: request.headers.get("user-agent") || undefined,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLoginAt: new Date(),
      failedLoginCount: 0,
      lockedUntil: null,
    },
  });

  await writeAuditLog({
    action: "login",
    actorId: user.id,
    actorEmail: user.email,
    ipAddress: ip,
    metadata: { reason: "LOGIN_SUCCESS" satisfies LoginAuditReason },
  });

  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(SESSION_SECONDS));
  return response;
}
