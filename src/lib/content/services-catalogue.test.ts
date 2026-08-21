import { describe, expect, it } from "vitest";
import {
  CONSULTATION_SERVICE_INTERESTS,
  RELATED_SERVICE_LINKS,
  SERVICES,
  getServiceBySlug,
} from "@/lib/content/services";
import { CAPABILITY_AREAS } from "@/lib/company";

describe("new consulting services catalogue", () => {
  it("includes SOC 2, PCI DSS and NIST CSF services as published AVAILABLE NOW entries", () => {
    const soc2 = getServiceBySlug("soc-2-readiness");
    const pci = getServiceBySlug("pci-dss-readiness");
    const nist = getServiceBySlug("nist-csf-cybersecurity-maturity");

    expect(soc2?.title).toBe("SOC 2 Readiness & Attestation Preparation Support");
    expect(pci?.title).toBe("PCI DSS Readiness & Compliance Support");
    expect(nist?.title).toBe("NIST CSF 2.0 & Cybersecurity Maturity Assessment");

    for (const service of [soc2, pci, nist]) {
      expect(service?.status).toBe("AVAILABLE_NOW");
      expect(service?.ctaLabel).toBe("Request a Consultation");
      expect(service?.methodology?.length).toBeGreaterThan(0);
      expect(service?.coverageAreas?.length).toBeGreaterThan(0);
      expect(service?.disclaimer).toBeTruthy();
    }
  });

  it("keeps claim-safe SOC 2 / PCI / NIST disclaimer language", () => {
    const soc2 = getServiceBySlug("soc-2-readiness")!;
    const pci = getServiceBySlug("pci-dss-readiness")!;
    const nist = getServiceBySlug("nist-csf-cybersecurity-maturity")!;

    expect(soc2.disclaimer).toContain("independent CPA/audit firm");
    expect(soc2.disclaimer!.toLowerCase()).not.toContain("we issue soc 2");
    expect(pci.disclaimer).toMatch(/does not claim Qualified Security Assessor/i);
    expect(pci.disclaimer).toMatch(/does not guarantee compliance/i);
    expect(nist.disclaimer).toMatch(/not NIST-approved/i);
    expect(nist.disclaimer).toMatch(/does not claim partnership with NIST/i);
  });

  it("exposes 14 core areas plus the featured readiness assessment", () => {
    const featured = SERVICES.filter((s) => s.isFeatured);
    const core = SERVICES.filter((s) => !s.isFeatured);
    expect(featured).toHaveLength(1);
    expect(featured[0].slug).toBe("iso-27001-grc-readiness-assessment");
    expect(core).toHaveLength(14);
    expect(SERVICES).toHaveLength(15);
  });

  it("surfaces the three new services on homepage capability links", () => {
    const hrefs = CAPABILITY_AREAS.map((a) => a.href);
    expect(hrefs).toContain("/services/soc-2-readiness");
    expect(hrefs).toContain("/services/pci-dss-readiness");
    expect(hrefs).toContain("/services/nist-csf-cybersecurity-maturity");
  });

  it("includes the three services in consultation interest options", () => {
    const values = CONSULTATION_SERVICE_INTERESTS.map((i) => i.value);
    expect(values).toContain("SOC 2 Readiness");
    expect(values).toContain("PCI DSS Readiness");
    expect(values).toContain("NIST CSF 2.0 / Cybersecurity Maturity");
  });

  it("defines related internal links for the three new services", () => {
    expect(RELATED_SERVICE_LINKS["soc-2-readiness"]?.length).toBeGreaterThan(0);
    expect(RELATED_SERVICE_LINKS["pci-dss-readiness"]?.length).toBeGreaterThan(0);
    expect(RELATED_SERVICE_LINKS["nist-csf-cybersecurity-maturity"]?.length).toBeGreaterThan(0);
  });
});
