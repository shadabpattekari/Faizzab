/** Canonical company identity — use everywhere. Never invent alternate legal names. */
export const COMPANY = {
  legalName: "FAIZZAB INTEGRITY PRIVATE LIMITED",
  brand: "FaizZab",
  cin: "U62020PN2026PTC259388",
  domain: "faizzab.com",
  url: "https://faizzab.com",
  email: "info@faizzab.com",
  telephone: "+91 91757 68019",
  telephoneDisplay: "+91 91757 68019",
  /** WhatsApp chat link (same number). */
  whatsapp: "https://wa.me/919175768019",
  grievances: "Nazneen Pattekari, Director",
  corporateOffice: {
    lines: [
      "314, Gera Imperium Rise,",
      "Opposite Wipro Circle, Hinjewadi Phase 2,",
      "Pune, Maharashtra 411057, India",
    ],
    singleLine:
      "314, Gera Imperium Rise, Opposite Wipro Circle, Hinjewadi Phase 2, Pune, Maharashtra 411057, India",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Gera+Imperium+Rise+Hinjewadi+Phase+2+Pune+411057",
  },
  registeredOffice: {
    lines: [
      "Flat No. 512, SKY I Star, Town II, Bldg No. 6,",
      "Mulshi, Bhukum, Mulshi,",
      "Pune - 412115,",
      "Maharashtra, India",
    ],
    singleLine:
      "Flat No. 512, SKY I Star, Town II, Bldg No. 6, Mulshi, Bhukum, Mulshi, Pune - 412115, Maharashtra, India",
  },
} as const;

export const BUSINESS_STATUS = {
  consulting: { label: "AVAILABLE NOW", key: "AVAILABLE_NOW" as const },
  academy: { label: "COMING SOON", key: "COMING_SOON" as const },
  grcPlatform: { label: "IN DEVELOPMENT", key: "IN_DEVELOPMENT" as const },
  toolkit: { label: "COMING SOON", key: "COMING_SOON" as const },
  readinessAssessment: { label: "AVAILABLE NOW", key: "AVAILABLE_NOW" as const },
} as const;

export const PRIMARY_HEADLINE =
  "Governance. Risk. Compliance. Built for Practical Implementation.";

export const PRACTICAL_APPROACH = [
  "Understand",
  "Assess",
  "Prioritize",
  "Implement",
  "Evidence",
  "Improve",
] as const;

export const CAPABILITY_AREAS = [
  { label: "ISO Management Systems", href: "/services/iso-management-systems" },
  { label: "GRC", href: "/services/grc-advisory" },
  { label: "AI Governance / ISO 42001", href: "/services/ai-governance-iso-42001" },
  { label: "Privacy / DPDP", href: "/services/privacy-dpdp" },
  { label: "SOC 2 Readiness", href: "/services/soc-2-readiness" },
  { label: "PCI DSS Readiness", href: "/services/pci-dss-readiness" },
  { label: "SOX / ITGC", href: "/services/sox-itgc" },
  {
    label: "NIST CSF 2.0 / Cybersecurity Maturity",
    href: "/services/nist-csf-cybersecurity-maturity",
  },
  { label: "Cybersecurity Governance", href: "/services/cybersecurity-governance" },
  { label: "IT Audit", href: "/services/it-audit" },
  { label: "Risk Management", href: "/services/risk-management" },
  { label: "Internal Audit", href: "/services/internal-audit" },
  { label: "Business Continuity", href: "/services/business-continuity" },
  { label: "Third-Party Risk", href: "/services/third-party-risk" },
] as const;

/** Shown on the home page under the hero. Standards and frameworks FaizZab implements. */
export const STANDARDS_WE_IMPLEMENT = [
  "ISO/IEC 27001",
  "ISO/IEC 42001",
  "ISO/IEC 27701",
  "India DPDP",
  "SOC 2",
  "PCI DSS",
  "NIST CSF 2.0",
] as const;

/** Home page: the 14 capability areas in four groups, each with one line. */
export const CAPABILITY_GROUPS = [
  {
    title: "ISO and management systems",
    description: "Design, implement and evidence certifiable management systems.",
    items: [
      { label: "ISO Management Systems", href: "/services/iso-management-systems" },
      { label: "Cybersecurity Governance", href: "/services/cybersecurity-governance" },
      {
        label: "NIST CSF 2.0 / Cybersecurity Maturity",
        href: "/services/nist-csf-cybersecurity-maturity",
      },
    ],
  },
  {
    title: "Privacy and AI governance",
    description: "Meet DPDP and privacy expectations, and govern AI responsibly.",
    items: [
      { label: "Privacy / DPDP", href: "/services/privacy-dpdp" },
      { label: "AI Governance / ISO 42001", href: "/services/ai-governance-iso-42001" },
    ],
  },
  {
    title: "Audit and assurance",
    description: "Get ready for audits, attestations and customer assurance requests.",
    items: [
      { label: "SOC 2 Readiness", href: "/services/soc-2-readiness" },
      { label: "PCI DSS Readiness", href: "/services/pci-dss-readiness" },
      { label: "SOX / ITGC", href: "/services/sox-itgc" },
      { label: "IT Audit", href: "/services/it-audit" },
      { label: "Internal Audit", href: "/services/internal-audit" },
    ],
  },
  {
    title: "Risk and resilience",
    description: "Manage risk across the business, its suppliers and disruptions.",
    items: [
      { label: "GRC Advisory", href: "/services/grc-advisory" },
      { label: "Risk Management", href: "/services/risk-management" },
      { label: "Third-Party Risk", href: "/services/third-party-risk" },
      { label: "Business Continuity", href: "/services/business-continuity" },
    ],
  },
] as const;

/** Home page: what happens at each step of the practical approach. */
export const APPROACH_DETAILS = [
  { step: "Understand", detail: "Your business, scope, obligations and what good looks like." },
  { step: "Assess", detail: "Current controls, documents and evidence against the requirement." },
  { step: "Prioritize", detail: "Gaps ranked by risk and effort into a 30/60/90-day plan." },
  { step: "Implement", detail: "Policies, processes and controls built with your team." },
  { step: "Evidence", detail: "Records an auditor or customer can actually verify." },
  { step: "Improve", detail: "Reviews and metrics that keep the system working." },
] as const;

/** Contact form "Subject" choices; each routes the enquiry. */
export const ENQUIRY_SUBJECTS = [
  "Consulting / implementation",
  "Readiness assessment",
  "FaizZab Academy course",
  "GRC internship",
  "Toolkit",
  "GRC Platform",
  "Other",
] as const;

export const INDUSTRIES = [
  "Technology & SaaS",
  "Financial Services / FinTech",
  "Healthcare",
  "Professional Services",
  "Manufacturing",
  "Education",
  "Small and Mid-Sized Organizations",
] as const;

export const NAV_MAIN = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Academy", href: "/academy" },
  { label: "GRC Platform", href: "/grc-platform" },
  { label: "Toolkits", href: "/toolkits" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LEGAL = [
  { label: "Corporate Information", href: "/corporate-information" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookie Policy", href: "/cookie-policy" },
] as const;
