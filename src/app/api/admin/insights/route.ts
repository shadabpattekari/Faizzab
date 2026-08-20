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
  requiredString,
} from "@/lib/admin/api";

export async function POST(request: NextRequest) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;

  try {
    const body = await readObject(request);
    const publishStatus = enumValue(body, "publishStatus", PUBLISH_STATUSES) ?? "DRAFT";
    const insight = await prisma.insight.create({
      data: {
        slug: requiredString(body, "slug", 200),
        title: requiredString(body, "title", 300),
        excerpt: requiredString(body, "excerpt", 5_000),
        content: requiredString(body, "content", 200_000),
        category: requiredString(body, "category", 100),
        publishStatus,
        publishedAt: publishStatus === "PUBLISHED" ? new Date() : null,
        seoTitle: optionalString(body, "seoTitle", 200),
        seoDescription: optionalString(body, "seoDescription", 500),
      },
    });
    await auditAdminMutation(request, user, {
      action: "insight_created",
      entityType: "Insight",
      entityId: insight.id,
      metadata: { slug: insight.slug, publishStatus },
    });
    return NextResponse.json({ ok: true, insight }, { status: 201 });
  } catch (error) {
    return mutationError(error);
  }
}
