import type { NextRequest } from "next/server";
import { toolkitFormSchema } from "@/lib/validation/forms";
import { handleLeadPost } from "@/lib/api/lead-handler";

export async function POST(request: NextRequest) {
  return handleLeadPost(request, {
    schema: toolkitFormSchema,
    leadType: "TOOLKIT",
    rateKeyPrefix: "toolkit",
    map: (data) => ({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      subject: "Toolkit launch / purchase interest",
      privacyAccepted: data.privacyAccepted,
    }),
  });
}
