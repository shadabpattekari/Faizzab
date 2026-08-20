import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  auditAdminMutation,
  authorizeAdmin,
  booleanValue,
  isAuthError,
  mutationError,
  optionalString,
  readObject,
} from "@/lib/admin/api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;
  try {
    const { id } = await params;
    const body = await readObject(request);
    const path = optionalString(body, "path", 300);
    if (path && !path.startsWith("/")) {
      return NextResponse.json({ ok: false, error: "path must start with /." }, { status: 400 });
    }
    const entry = await prisma.seoEntry.update({
      where: { id },
      data: {
        path: path ?? undefined,
        title: optionalString(body, "title", 200) ?? undefined,
        description: optionalString(body, "description", 500) ?? undefined,
        ogTitle: optionalString(body, "ogTitle", 200),
        ogDescription: optionalString(body, "ogDescription", 500),
        noindex: booleanValue(body, "noindex"),
      },
    });
    await auditAdminMutation(request, user, {
      action: "seo_entry_updated",
      entityType: "SeoEntry",
      entityId: id,
      metadata: { path: entry.path },
    });
    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    return mutationError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;
  try {
    const { id } = await params;
    const entry = await prisma.seoEntry.delete({ where: { id } });
    await auditAdminMutation(request, user, {
      action: "seo_entry_deleted",
      entityType: "SeoEntry",
      entityId: id,
      metadata: { path: entry.path },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return mutationError(error);
  }
}
