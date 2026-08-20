import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  LEAD_STATUSES,
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
    const body = await readObject(request);
    const status = enumValue(body, "status", LEAD_STATUSES);
    const adminNotes = optionalString(body, "adminNotes", 10_000);
    if (status === undefined && adminNotes === undefined) {
      return NextResponse.json({ ok: false, error: "No changes supplied." }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status, adminNotes },
      select: { id: true, status: true, adminNotes: true, updatedAt: true },
    });
    await auditAdminMutation(request, user, {
      action: "enquiry_updated",
      entityType: "Enquiry",
      entityId: id,
      metadata: { status, notesChanged: adminNotes !== undefined },
    });
    return NextResponse.json({ ok: true, enquiry });
  } catch (error) {
    return mutationError(error);
  }
}
