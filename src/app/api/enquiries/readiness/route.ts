import type { NextRequest } from "next/server";
import { readinessFormSchema } from "@/lib/validation/forms";
import { handleLeadPost } from "@/lib/api/lead-handler";

export async function POST(request: NextRequest) {
  return handleLeadPost(request, {
    schema: readinessFormSchema,
    leadType: "READINESS_ASSESSMENT",
    rateKeyPrefix: "readiness",
    map: (data) => ({
      name: data.name,
      email: data.email,
      company: data.company,
      jobTitle: data.jobTitle,
      telephone: data.telephone,
      country: data.country,
      industry: data.industry,
      organizationSize: data.organizationSize,
      currentStatus: data.currentStatus,
      reason: data.reason,
      targetTimeframe: data.targetTimeframe,
      message: data.message,
      subject: "ISO 27001 & GRC Readiness Assessment request",
      privacyAccepted: data.privacyAccepted,
    }),
  });
}
