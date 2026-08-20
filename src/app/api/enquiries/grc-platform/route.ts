import type { NextRequest } from "next/server";
import { grcPlatformFormSchema } from "@/lib/validation/forms";
import { handleLeadPost } from "@/lib/api/lead-handler";

export async function POST(request: NextRequest) {
  return handleLeadPost(request, {
    schema: grcPlatformFormSchema,
    leadType: "GRC_PLATFORM",
    rateKeyPrefix: "grc-platform",
    map: (data) => ({
      name: data.name,
      email: data.email,
      company: data.company,
      jobTitle: data.jobTitle,
      organizationSize: data.organizationSize,
      areasOfInterest: data.areasOfInterest,
      message: data.message,
      subject: "GRC Platform interest",
      privacyAccepted: data.privacyAccepted,
    }),
  });
}
