import type { NextRequest } from "next/server";
import { contactFormSchema } from "@/lib/validation/forms";
import { handleLeadPost } from "@/lib/api/lead-handler";

export async function POST(request: NextRequest) {
  return handleLeadPost(request, {
    schema: contactFormSchema,
    leadType: "GENERAL",
    rateKeyPrefix: "contact",
    map: (data) => ({
      name: data.name,
      email: data.email,
      company: data.company,
      telephone: data.telephone,
      subject: data.subject,
      message: data.message,
      privacyAccepted: data.privacyAccepted,
    }),
  });
}
