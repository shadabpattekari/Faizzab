import { NextResponse, type NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { getSessionUser, isSuperAdmin, type SessionUser } from "@/lib/auth/session";
import { writeAuditLog } from "@/lib/auth/audit";
import { getClientIp } from "@/lib/utils";

export const PRODUCT_STATUSES = [
  "AVAILABLE_NOW",
  "COMING_SOON",
  "IN_DEVELOPMENT",
] as const;
export const PUBLISH_STATUSES = ["DRAFT", "PUBLISHED"] as const;
export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "WON",
  "CLOSED",
  "SPAM",
] as const;

export class AdminInputError extends Error {}

export async function authorizeAdmin(
  request: NextRequest,
  options: { superAdminOnly?: boolean } = {}
): Promise<SessionUser | NextResponse> {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (options.superAdminOnly && !isSuperAdmin(user)) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }
  return user;
}

export function isAuthError(value: SessionUser | NextResponse): value is NextResponse {
  return value instanceof NextResponse;
}

export async function readObject(request: NextRequest): Promise<Record<string, unknown>> {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new AdminInputError("A JSON object is required.");
  }
  return body as Record<string, unknown>;
}

export function requiredString(
  body: Record<string, unknown>,
  key: string,
  max = 10_000
): string {
  const value = body[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new AdminInputError(`${key} is required.`);
  }
  if (value.trim().length > max) {
    throw new AdminInputError(`${key} is too long.`);
  }
  return value.trim();
}

export function optionalString(
  body: Record<string, unknown>,
  key: string,
  max = 10_000
): string | null | undefined {
  const value = body[key];
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;
  if (typeof value !== "string") throw new AdminInputError(`${key} must be text.`);
  if (value.trim().length > max) throw new AdminInputError(`${key} is too long.`);
  return value.trim() || null;
}

export function enumValue<T extends string>(
  body: Record<string, unknown>,
  key: string,
  allowed: readonly T[]
): T | undefined {
  const value = body[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new AdminInputError(`${key} is invalid.`);
  }
  return value as T;
}

export function booleanValue(
  body: Record<string, unknown>,
  key: string
): boolean | undefined {
  const value = body[key];
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new AdminInputError(`${key} must be true or false.`);
}

export function integerValue(
  body: Record<string, unknown>,
  key: string,
  min = 0,
  max = 100_000
): number | undefined {
  const value = body[key];
  if (value === undefined || value === "") return undefined;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new AdminInputError(`${key} must be an integer from ${min} to ${max}.`);
  }
  return parsed;
}

export function jsonValue(
  body: Record<string, unknown>,
  key: string
): Prisma.InputJsonValue | undefined {
  const value = body[key];
  if (value === undefined) return undefined;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as Prisma.InputJsonValue;
    } catch {
      throw new AdminInputError(`${key} must contain valid JSON.`);
    }
  }
  return value as Prisma.InputJsonValue;
}

export function stringListValue(
  body: Record<string, unknown>,
  key: string
): Prisma.InputJsonValue | undefined {
  const value = body[key];
  if (value === undefined) return undefined;
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }
  if (typeof value !== "string") {
    throw new AdminInputError(`${key} must be a list.`);
  }
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function mutationError(error: unknown) {
  if (error instanceof AdminInputError) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }
  console.error("Admin mutation failed", error);
  return NextResponse.json({ ok: false, error: "Unable to save changes." }, { status: 500 });
}

export async function auditAdminMutation(
  request: NextRequest,
  user: SessionUser,
  input: {
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
  }
) {
  await writeAuditLog({
    actorId: user.id,
    actorEmail: user.email,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    metadata: input.metadata,
    ipAddress: getClientIp(request.headers),
  });
}
