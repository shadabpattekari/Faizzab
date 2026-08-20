import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  PRODUCT_STATUSES,
  auditAdminMutation,
  authorizeAdmin,
  enumValue,
  isAuthError,
  mutationError,
  optionalString,
  readObject,
  stringListValue,
} from "@/lib/admin/api";

export async function PATCH(request: NextRequest) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;

  try {
    const body = await readObject(request);
    const id = optionalString(body, "id", 64);
    if (!id) {
      return NextResponse.json({ ok: false, error: "Platform content id is required." }, { status: 400 });
    }
    const platform = await prisma.grcPlatformContent.update({
      where: { id },
      data: {
        title: optionalString(body, "title", 300) ?? undefined,
        status: enumValue(body, "status", PRODUCT_STATUSES),
        summary: optionalString(body, "summary", 5_000) ?? undefined,
        description: optionalString(body, "description", 200_000) ?? undefined,
        features: stringListValue(body, "features"),
        seoTitle: optionalString(body, "seoTitle", 200),
        seoDescription: optionalString(body, "seoDescription", 500),
      },
    });
    await auditAdminMutation(request, user, {
      action: "grc_platform_updated",
      entityType: "GrcPlatformContent",
      entityId: id,
      metadata: { status: platform.status },
    });
    return NextResponse.json({ ok: true, platform });
  } catch (error) {
    return mutationError(error);
  }
}
