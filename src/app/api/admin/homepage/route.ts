import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  auditAdminMutation,
  authorizeAdmin,
  booleanValue,
  integerValue,
  isAuthError,
  jsonValue,
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
    const key = requiredString(body, "key", 100);
    const content = jsonValue(body, "content");
    if (content === undefined) {
      return NextResponse.json({ ok: false, error: "content is required." }, { status: 400 });
    }
    const section = await prisma.homepageSection.create({
      data: {
        key,
        title: optionalString(body, "title", 300),
        content,
        isVisible: booleanValue(body, "isVisible") ?? true,
        sortOrder: integerValue(body, "sortOrder") ?? 0,
      },
    });
    await auditAdminMutation(request, user, {
      action: "homepage_section_created",
      entityType: "HomepageSection",
      entityId: section.id,
      metadata: { key },
    });
    return NextResponse.json({ ok: true, section }, { status: 201 });
  } catch (error) {
    return mutationError(error);
  }
}

export async function PATCH(request: NextRequest) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;
  try {
    const body = await readObject(request);
    const id = requiredString(body, "id", 64);
    const section = await prisma.homepageSection.update({
      where: { id },
      data: {
        title: optionalString(body, "title", 300),
        content: jsonValue(body, "content"),
        isVisible: booleanValue(body, "isVisible"),
        sortOrder: integerValue(body, "sortOrder"),
      },
    });
    await auditAdminMutation(request, user, {
      action: "homepage_section_updated",
      entityType: "HomepageSection",
      entityId: id,
      metadata: { key: section.key, isVisible: section.isVisible },
    });
    return NextResponse.json({ ok: true, section });
  } catch (error) {
    return mutationError(error);
  }
}
