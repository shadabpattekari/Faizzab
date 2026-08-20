import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  PRODUCT_STATUSES,
  PUBLISH_STATUSES,
  auditAdminMutation,
  authorizeAdmin,
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
    const course = await prisma.academyCourse.update({
      where: { id },
      data: {
        title: optionalString(body, "title", 300) ?? undefined,
        summary: optionalString(body, "summary", 5_000) ?? undefined,
        description: optionalString(body, "description", 200_000) ?? undefined,
        status: enumValue(body, "status", PRODUCT_STATUSES),
        sortOrder: integerValue(body, "sortOrder"),
        audience: optionalString(body, "audience", 10_000),
        outcomes: stringListValue(body, "outcomes"),
        futureFeatures: stringListValue(body, "futureFeatures"),
        seoTitle: optionalString(body, "seoTitle", 200),
        seoDescription: optionalString(body, "seoDescription", 500),
        publishStatus: enumValue(body, "publishStatus", PUBLISH_STATUSES),
      },
    });
    await auditAdminMutation(request, user, {
      action: "academy_course_updated",
      entityType: "AcademyCourse",
      entityId: id,
      metadata: { slug: course.slug, status: course.status },
    });
    return NextResponse.json({ ok: true, course });
  } catch (error) {
    return mutationError(error);
  }
}
