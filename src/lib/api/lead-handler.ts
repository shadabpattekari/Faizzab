import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { createEnquiry, type EnquiryInput } from "@/lib/enquiries";
import { getClientIp } from "@/lib/utils";
import type { LeadType } from "@prisma/client";

export async function handleLeadPost<T extends Record<string, unknown>>(
  request: NextRequest,
  options: {
    schema: ZodSchema<T>;
    leadType: LeadType;
    rateKeyPrefix: string;
    map: (data: T) => Omit<EnquiryInput, "leadType" | "ipAddress" | "userAgent" | "honeypotHit">;
  }
) {
  const ip = getClientIp(request.headers) || "unknown";
  const rate = await checkRateLimit({
    key: `${options.rateKeyPrefix}:${ip}`,
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });

  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = options.schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const honeypot = String((data as { website?: string }).website ?? "");
  if (honeypot.trim().length > 0) {
    // Pretend success to bots; do not store as useful lead (or store marked)
    return NextResponse.json({ ok: true });
  }

  try {
    const mapped = options.map(data);
    await createEnquiry({
      ...mapped,
      leadType: options.leadType,
      honeypotHit: false,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not save your submission right now. Please email info@faizzab.com or try again shortly.",
      },
      { status: 500 }
    );
  }
}
