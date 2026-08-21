import type { NextRequest } from "next/server";
import { consultationFormSchema } from "@/lib/validation/forms";
import { handleLeadPost } from "@/lib/api/lead-handler";

export async function POST(request: NextRequest) {
  return handleLeadPost(request, {
    schema: consultationFormSchema,
    leadType: "CONSULTATION",
    rateKeyPrefix: "consultation",
    map: (data) => ({
      name: data.name,
      email: data.email,
      company: data.company,
      telephone: data.telephone,
      message: data.message,
      subject: "Consultation request",
      areasOfInterest: data.serviceInterest,
      privacyAccepted: data.privacyAccepted,
    }),
  });
}
