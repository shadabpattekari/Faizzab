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
  requiredString,
} from "@/lib/admin/api";

export async function POST(request: NextRequest) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;

  try {
    const body = await readObject(request);
    const faq = await prisma.fAQ.create({
      data: {
        question: requiredString(body, "question", 500),
        answer: requiredString(body, "answer", 10_000),
        category: optionalString(body, "category", 100),
        sortOrder: integerValue(body, "sortOrder") ?? 0,
        publishStatus: enumValue(body, "publishStatus", PUBLISH_STATUSES) ?? "PUBLISHED",
      },
    });
    await auditAdminMutation(request, user, {
      action: "faq_created",
      entityType: "FAQ",
      entityId: faq.id,
    });
    return NextResponse.json({ ok: true, faq }, { status: 201 });
  } catch (error) {
    return mutationError(error);
  }
}
