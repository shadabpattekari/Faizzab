import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/session";
import {
  auditAdminMutation,
  authorizeAdmin,
  booleanValue,
  isAuthError,
  mutationError,
  readObject,
  requiredString,
} from "@/lib/admin/api";

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
} as const;

export async function POST(request: NextRequest) {
  const user = await authorizeAdmin(request, { superAdminOnly: true });
  if (isAuthError(user)) return user;
  try {
    const body = await readObject(request);
    const name = requiredString(body, "name", 200);
    const email = requiredString(body, "email", 255).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }
    const password = requiredString(body, "password", 200);
    const strengthError = validatePasswordStrength(password);
    if (strengthError) {
      return NextResponse.json({ ok: false, error: strengthError }, { status: 400 });
    }
    const created = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(password),
        role: "CONTENT_EDITOR",
      },
      select: USER_SELECT,
    });
    await auditAdminMutation(request, user, {
      action: "content_editor_created",
      entityType: "User",
      entityId: created.id,
      metadata: { email: created.email, role: created.role },
    });
    return NextResponse.json({ ok: true, user: created }, { status: 201 });
  } catch (error) {
    return mutationError(error);
  }
}

export async function PATCH(request: NextRequest) {
  const user = await authorizeAdmin(request, { superAdminOnly: true });
  if (isAuthError(user)) return user;
  try {
    const body = await readObject(request);
    const id = requiredString(body, "id", 64);
    const isActive = booleanValue(body, "isActive");
    if (isActive === undefined) {
      return NextResponse.json({ ok: false, error: "isActive is required." }, { status: 400 });
    }
    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true },
    });
    if (!target) {
      return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });
    }
    if (target.role !== "CONTENT_EDITOR") {
      return NextResponse.json(
        { ok: false, error: "Super Admin accounts cannot be changed here." },
        { status: 403 }
      );
    }
    const updated = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: USER_SELECT,
    });
    if (!isActive) {
      await prisma.session.deleteMany({ where: { userId: id } });
    }
    await auditAdminMutation(request, user, {
      action: isActive ? "content_editor_activated" : "content_editor_deactivated",
      entityType: "User",
      entityId: id,
      metadata: { email: target.email },
    });
    return NextResponse.json({ ok: true, user: updated });
  } catch (error) {
    return mutationError(error);
  }
}
