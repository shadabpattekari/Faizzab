import { describe, expect, it } from "vitest";
import {
  COMPANY,
  BUSINESS_STATUS,
  PRIMARY_HEADLINE,
} from "@/lib/company";
import {
  contactFormSchema,
  readinessFormSchema,
  academyFormSchema,
} from "@/lib/validation/forms";
import { validatePasswordStrength } from "@/lib/auth/session";

describe("company identity", () => {
  it("uses the correct legal entity details", () => {
    expect(COMPANY.legalName).toBe("FAIZZAB INTEGRITY PRIVATE LIMITED");
    expect(COMPANY.cin).toBe("U62020PN2026PTC259388");
    expect(COMPANY.email).toBe("info@faizzab.com");
    expect(COMPANY.telephone).toBe("+91 91757 68019");
    expect(COMPANY.grievances).toBe("Nazneen Pattekari, Director");
    expect(COMPANY.registeredOffice.singleLine).toContain("Pune - 412115");
    expect(COMPANY.legalName).not.toContain("Consultancy");
  });

  it("keeps business engine statuses consistent", () => {
    expect(BUSINESS_STATUS.consulting.label).toBe("AVAILABLE NOW");
    expect(BUSINESS_STATUS.academy.label).toBe("COMING SOON");
    expect(BUSINESS_STATUS.grcPlatform.label).toBe("IN DEVELOPMENT");
    expect(BUSINESS_STATUS.toolkit.label).toBe("COMING SOON");
  });

  it("uses the required primary headline", () => {
    expect(PRIMARY_HEADLINE).toBe(
      "Governance. Risk. Compliance. Built for Practical Implementation."
    );
  });
});

describe("form validation", () => {
  it("accepts a valid contact payload", () => {
    const parsed = contactFormSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      company: "",
      telephone: "",
      subject: "Hello",
      message: "This is a sufficiently long message.",
      privacyAccepted: true,
      website: "",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects readiness payload without privacy acknowledgement", () => {
    const parsed = readinessFormSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      company: "Acme",
      jobTitle: "CISO",
      telephone: "",
      country: "India",
      industry: "Technology",
      organizationSize: "11-50",
      currentStatus: "Starting",
      reason: "Need a readiness baseline for our ISMS.",
      targetTimeframe: "1-3-months",
      message: "",
      privacyAccepted: false,
      website: "",
    });
    expect(parsed.success).toBe(false);
  });

  it("accepts academy launch list payload", () => {
    const parsed = academyFormSchema.safeParse({
      name: "Learner",
      email: "learner@example.com",
      company: "",
      jobTitle: "",
      courseInterest: "ISO/IEC 27001 Practical Implementer",
      country: "India",
      privacyAccepted: true,
      website: "",
    });
    expect(parsed.success).toBe(true);
  });
});

describe("password rules", () => {
  it("requires strong passwords", () => {
    expect(validatePasswordStrength("short")).toBeTruthy();
    expect(validatePasswordStrength("StrongPass1!")).toBeNull();
  });
});
