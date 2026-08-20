import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { authorizeAdmin, isAuthError } from "@/lib/admin/api";

export async function GET(request: NextRequest) {
  const user = await authorizeAdmin(request, { superAdminOnly: true });
  if (isAuthError(user)) return user;

  const take = Math.min(Math.max(Number(request.nextUrl.searchParams.get("limit")) || 100, 1), 250);
  const action = request.nextUrl.searchParams.get("action")?.slice(0, 128);
  const logs = await prisma.auditLog.findMany({
    where: action ? { action } : undefined,
    orderBy: { createdAt: "desc" },
    take,
    select: {
      id: true,
      actorEmail: true,
      action: true,
      entityType: true,
      entityId: true,
      metadata: true,
      ipAddress: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ ok: true, logs });
}
