import { prisma } from "@/lib/db/prisma";

type AuditInput = {
  actorId?: string | null;
  actorEmail?: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string | null;
};

const SENSITIVE_KEYS = [
  "password",
  "passwordHash",
  "token",
  "tokenHash",
  "session",
  "smtp",
  "secret",
  "DATABASE_URL",
  "SMTP_PASS",
];

function scrub(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(scrub);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_KEYS.some((s) => k.toLowerCase().includes(s.toLowerCase()))) {
        out[k] = "[redacted]";
      } else {
        out[k] = scrub(v);
      }
    }
    return out;
  }
  return value;
}

export async function writeAuditLog(input: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: input.actorId ?? null,
        actorEmail: input.actorEmail ?? null,
        action: input.action.slice(0, 128),
        entityType: input.entityType?.slice(0, 64),
        entityId: input.entityId?.slice(0, 64),
        metadata: input.metadata ? (scrub(input.metadata) as object) : undefined,
        ipAddress: input.ipAddress?.slice(0, 64),
      },
    });
  } catch {
    // Never block primary flow on audit failure
  }
}
