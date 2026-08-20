import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  PRODUCT_STATUSES,
  PUBLISH_STATUSES,
  auditAdminMutation,
  authorizeAdmin,
  booleanValue,
  enumValue,
  integerValue,
  isAuthError,
  mutationError,
  optionalString,
  readObject,
  stringListValue,
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
    const service = await prisma.service.update({
      where: { id },
      data: {
        title: optionalString(body, "title", 300) ?? undefined,
        shortDescription: optionalString(body, "shortDescription", 5_000) ?? undefined,
        longDescription: optionalString(body, "longDescription", 200_000) ?? undefined,
        status: enumValue(body, "status", PRODUCT_STATUSES),
        isFeatured: booleanValue(body, "isFeatured"),
        sortOrder: integerValue(body, "sortOrder"),
        ctaLabel: optionalString(body, "ctaLabel", 100),
        ctaHref: optionalString(body, "ctaHref", 300),
        methodology: stringListValue(body, "methodology"),
        deliverables: stringListValue(body, "deliverables"),
        coverageAreas: stringListValue(body, "coverageAreas"),
        disclaimer: optionalString(body, "disclaimer", 100_000),
        seoTitle: optionalString(body, "seoTitle", 200),
        seoDescription: optionalString(body, "seoDescription", 500),
        publishStatus: enumValue(body, "publishStatus", PUBLISH_STATUSES),
      },
    });
    await auditAdminMutation(request, user, {
      action: "service_updated",
      entityType: "Service",
      entityId: id,
      metadata: { slug: service.slug, status: service.status },
    });
    return NextResponse.json({ ok: true, service });
  } catch (error) {
    return mutationError(error);
  }
}
