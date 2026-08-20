import type { NextRequest } from "next/server";
import { academyFormSchema } from "@/lib/validation/forms";
import { handleLeadPost } from "@/lib/api/lead-handler";

export async function POST(request: NextRequest) {
  return handleLeadPost(request, {
    schema: academyFormSchema,
    leadType: "ACADEMY",
    rateKeyPrefix: "academy",
    map: (data) => ({
      name: data.name,
      email: data.email,
      company: data.company,
      jobTitle: data.jobTitle,
      courseInterest: data.courseInterest,
      country: data.country,
      subject: "Academy launch list",
      privacyAccepted: data.privacyAccepted,
    }),
  });
}
