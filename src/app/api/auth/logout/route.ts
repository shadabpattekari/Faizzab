import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  destroySession,
  getSessionUser,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { writeAuditLog } from "@/lib/auth/audit";
import { getClientIp } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await destroySession(token);
  }

  if (user) {
    await writeAuditLog({
      action: "logout",
      actorId: user.id,
      actorEmail: user.email,
      ipAddress: getClientIp(request.headers),
    });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(0), maxAge: 0 });
  return response;
}
