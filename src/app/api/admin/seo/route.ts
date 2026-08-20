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
  requiredString,
} from "@/lib/admin/api";

export async function POST(request: NextRequest) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;
  try {
    const body = await readObject(request);
    const path = requiredString(body, "path", 300);
    if (!path.startsWith("/")) {
      return NextResponse.json({ ok: false, error: "path must start with /." }, { status: 400 });
    }
    const entry = await prisma.seoEntry.create({
      data: {
        path,
        title: requiredString(body, "title", 200),
        description: requiredString(body, "description", 500),
        ogTitle: optionalString(body, "ogTitle", 200),
        ogDescription: optionalString(body, "ogDescription", 500),
        noindex: booleanValue(body, "noindex") ?? false,
      },
    });
    await auditAdminMutation(request, user, {
      action: "seo_entry_created",
      entityType: "SeoEntry",
      entityId: entry.id,
      metadata: { path },
    });
    return NextResponse.json({ ok: true, entry }, { status: 201 });
  } catch (error) {
    return mutationError(error);
  }
}
