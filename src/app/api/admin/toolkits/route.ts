import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  PRODUCT_STATUSES,
  PUBLISH_STATUSES,
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
    const slug = optionalString(body, "slug", 200);
    if (!id && !slug) {
      return NextResponse.json({ ok: false, error: "Toolkit id is required." }, { status: 400 });
    }
    const toolkit = await prisma.toolkitProduct.update({
      where: id ? { id } : { slug: slug! },
      data: {
        title: optionalString(body, "title", 300) ?? undefined,
        subtitle: optionalString(body, "subtitle", 500),
        description: optionalString(body, "description", 200_000) ?? undefined,
        status: enumValue(body, "status", PRODUCT_STATUSES),
        contents: stringListValue(body, "contents"),
        licenceSummary: optionalString(body, "licenceSummary", 100_000),
        disclaimer: optionalString(body, "disclaimer", 100_000),
        ctaLabel: optionalString(body, "ctaLabel", 100),
        seoTitle: optionalString(body, "seoTitle", 200),
        seoDescription: optionalString(body, "seoDescription", 500),
        publishStatus: enumValue(body, "publishStatus", PUBLISH_STATUSES),
      },
    });
    await auditAdminMutation(request, user, {
      action: "toolkit_updated",
      entityType: "ToolkitProduct",
      entityId: toolkit.id,
      metadata: { slug: toolkit.slug, status: toolkit.status },
    });
    return NextResponse.json({ ok: true, toolkit });
  } catch (error) {
    return mutationError(error);
  }
}
