import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  PUBLISH_STATUSES,
  auditAdminMutation,
  authorizeAdmin,
  enumValue,
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
    const current = await prisma.insight.findUnique({
      where: { id },
      select: { publishStatus: true, publishedAt: true },
    });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Insight not found." }, { status: 404 });
    }

    const body = await readObject(request);
    const publishStatus = enumValue(body, "publishStatus", PUBLISH_STATUSES);
    const insight = await prisma.insight.update({
      where: { id },
      data: {
        slug: optionalString(body, "slug", 200) ?? undefined,
        title: optionalString(body, "title", 300) ?? undefined,
        excerpt: optionalString(body, "excerpt", 5_000) ?? undefined,
        content: optionalString(body, "content", 200_000) ?? undefined,
        category: optionalString(body, "category", 100) ?? undefined,
        publishStatus,
        publishedAt:
          publishStatus === "PUBLISHED"
            ? current.publishedAt ?? new Date()
            : publishStatus === "DRAFT"
              ? null
              : undefined,
        seoTitle: optionalString(body, "seoTitle", 200),
        seoDescription: optionalString(body, "seoDescription", 500),
      },
    });
    await auditAdminMutation(request, user, {
      action: "insight_updated",
      entityType: "Insight",
      entityId: id,
      metadata: { publishStatus },
    });
    return NextResponse.json({ ok: true, insight });
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
    const insight = await prisma.insight.delete({
      where: { id },
      select: { id: true, slug: true },
    });
    await auditAdminMutation(request, user, {
      action: "insight_deleted",
      entityType: "Insight",
      entityId: id,
      metadata: { slug: insight.slug },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return mutationError(error);
  }
}
