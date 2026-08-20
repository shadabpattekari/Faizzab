import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { isSuperAdmin } from "@/lib/auth/session";
import { PROTECTED_COMPANY_SETTING_KEYS } from "@/lib/admin/settings";
import {
  auditAdminMutation,
  authorizeAdmin,
  isAuthError,
  jsonValue,
  mutationError,
  readObject,
  requiredString,
} from "@/lib/admin/api";

export async function PATCH(request: NextRequest) {
  const user = await authorizeAdmin(request);
  if (isAuthError(user)) return user;
  try {
    const body = await readObject(request);
    const key = requiredString(body, "key", 100);
    if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(key)) {
      return NextResponse.json({ ok: false, error: "Invalid setting key." }, { status: 400 });
    }
    if (PROTECTED_COMPANY_SETTING_KEYS.has(key) && !isSuperAdmin(user)) {
      return NextResponse.json(
        { ok: false, error: "Only a Super Admin can edit protected company identity." },
        { status: 403 }
      );
    }
    const value = jsonValue(body, "value");
    if (value === undefined) {
      return NextResponse.json({ ok: false, error: "value is required." }, { status: 400 });
    }
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
    await auditAdminMutation(request, user, {
      action: "site_setting_updated",
      entityType: "SiteSetting",
      entityId: setting.id,
      metadata: { key, protected: PROTECTED_COMPANY_SETTING_KEYS.has(key) },
    });
    return NextResponse.json({ ok: true, setting });
  } catch (error) {
    return mutationError(error);
  }
}
