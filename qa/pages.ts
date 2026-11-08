/** Every public page of faizzab.com. Keep in sync when pages are added. */
export const STATIC_PAGES = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/academy",
  "/grc-platform",
  "/toolkits",
  "/toolkits/iso-27001-grc-starter-toolkit-2026",
  "/insights",
  "/contact",
  "/contact?topic=consultation",
  "/corporate-information",
  "/privacy-policy",
  "/terms-of-use",
  "/disclaimer",
  "/cookie-policy",
];

export const SERVICE_SLUGS = [
  "ai-governance-iso-42001",
  "business-continuity",
  "cybersecurity-governance",
  "grc-advisory",
  "internal-audit",
  "iso-27001-grc-readiness-assessment",
  "iso-management-systems",
  "it-audit",
  "nist-csf-cybersecurity-maturity",
  "pci-dss-readiness",
  "privacy-dpdp",
  "risk-management",
  "soc-2-readiness",
  "sox-itgc",
  "third-party-risk",
];

export const COURSE_SLUGS = [
  "iso-27001-practical-implementer",
  "iso-42001-practical-ai-management-system-implementer",
  "ai-risk-management-practitioner",
  "india-dpdp-act-rules-practical-implementation",
  "iso-27701-2025-practical-pims-implementer",
  "grc-analyst-practitioner",
];

export const ALL_PAGES = [
  ...STATIC_PAGES,
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  ...COURSE_SLUGS.map((slug) => `/academy/${slug}`),
];

/** Company facts that must read the same everywhere (see src/lib/company.ts). */
export const COMPANY_FACTS = {
  legalName: "FAIZZAB INTEGRITY PRIVATE LIMITED",
  cin: "U62020PN2026PTC259388",
  email: "info@faizzab.com",
  phone: "+91 91757 68019",
  corporateOffice: "314, Gera Imperium Rise",
  registeredOffice: "Flat No. 512, SKY I Star",
};
