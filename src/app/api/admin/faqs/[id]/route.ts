import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  PUBLISH_STATUSES,
  auditAdminMutation,
  authorizeAdmin,
  enumValue,
  integerValue,
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
    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question: optionalString(body, "question", 500) ?? undefined,
        answer: optionalString(body, "answer", 10_000) ?? undefined,
        category: optionalString(body, "category", 100),
        sortOrder: integerValue(body, "sortOrder"),
        publishStatus: enumValue(body, "publishStatus", PUBLISH_STATUSES),
      },
    });
    await auditAdminMutation(request, user, {
      action: "faq_updated",
      entityType: "FAQ",
      entityId: id,
    });
    return NextResponse.json({ ok: true, faq });
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
    await prisma.fAQ.delete({ where: { id } });
    await auditAdminMutation(request, user, {
      action: "faq_deleted",
      entityType: "FAQ",
      entityId: id,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return mutationError(error);
  }
}
