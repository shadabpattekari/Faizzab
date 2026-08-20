import { BUSINESS_STATUS } from "@/lib/company";

export type ServiceContent = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  status: "AVAILABLE_NOW" | "COMING_SOON" | "IN_DEVELOPMENT";
  isFeatured: boolean;
  sortOrder: number;
  ctaLabel: string;
  ctaHref: string;
  methodology?: string[];
  deliverables?: string[];
  coverageAreas?: string[];
  disclaimer?: string;
  seoTitle: string;
  seoDescription: string;
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "iso-27001-grc-readiness-assessment",
    title: "FaizZab ISO 27001 & GRC Readiness Assessment",
    shortDescription:
      "A practical readiness assessment for organizations preparing an information security management system and GRC foundation.",
    longDescription: `The FaizZab ISO 27001 & GRC Readiness Assessment helps small and mid-sized organizations understand where they stand today — and what practical steps are needed to move from compliance intent to implementation evidence.

This packaged advisory service is designed for organizations with limited or fragmented information-security, governance and compliance documentation. It provides a structured review of ISMS and GRC readiness, prioritized findings, and a realistic roadmap for next steps.

Target customers include organizations seeking clarity before investing in full implementation programmes, preparing for future certification pathways, responding to customer or contractual assurance requests, or strengthening internal governance discipline.`,
    status: BUSINESS_STATUS.readinessAssessment.key,
    isFeatured: true,
    sortOrder: 1,
    ctaLabel: "Request a Readiness Assessment",
    ctaHref: "#request-assessment",
    methodology: [
      "Scope & Intake",
      "Document & Evidence Review",
      "Stakeholder Discussions",
      "Readiness Analysis",
      "Management Readout & Roadmap",
    ],
    deliverables: [
      "Executive Management Summary",
      "Detailed Readiness / Gap Assessment",
      "Maturity Summary / Heatmap",
      "Priority Findings",
      "Evidence & Documentation Priority List",
      "Recommended 30/60/90-Day Roadmap",
      "Longer-Term Implementation Recommendations",
      "Management Readout",
    ],
    coverageAreas: [
      "Organizational context",
      "Interested parties",
      "ISMS scope",
      "Governance",
      "Leadership",
      "Roles and responsibilities",
      "Risk methodology",
      "Risk assessment",
      "Risk treatment",
      "Statement of Applicability readiness",
      "Policies",
      "Procedures",
      "Documented information",
      "Asset governance",
      "Suppliers",
      "Third-party risk",
      "Access governance",
      "Access reviews",
      "Security incidents",
      "Legal obligations",
      "Regulatory obligations",
      "Contractual obligations",
      "Business continuity",
      "Disaster recovery",
      "Evidence readiness",
      "Internal-audit readiness",
      "Management-review readiness",
      "Nonconformity",
      "Corrective actions",
      "Objectives",
      "KPIs",
      "Prioritized implementation roadmap",
    ],
    disclaimer: `This engagement is a readiness and advisory assessment. It is not an accredited certification audit. FaizZab does not issue ISO certification, and certification is not guaranteed. This service does not constitute legal advice. Penetration testing and technical security testing are not included unless separately agreed. Remediation and implementation support are not automatically included unless separately contracted.`,
    seoTitle: "ISO 27001 & GRC Readiness Assessment | FaizZab",
    seoDescription:
      "Practical ISO 27001 and GRC readiness assessment for small and mid-sized organizations. Fixed-fee proposal after scoping.",
  },
  {
    slug: "iso-management-systems",
    title: "ISO Management Systems",
    shortDescription:
      "Implementation-focused support for building and strengthening ISO-aligned management systems.",
    longDescription:
      "FaizZab supports organizations establishing practical ISO management system foundations — including scope definition, documented information, roles, risk processes, objectives, internal audit readiness and continual improvement — with an emphasis on usable evidence rather than paperwork alone.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 2,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "ISO Management Systems Consulting | FaizZab",
    seoDescription:
      "Practical ISO management systems consulting focused on implementation and evidence readiness.",
  },
  {
    slug: "grc-advisory",
    title: "GRC Advisory",
    shortDescription:
      "Governance, risk and compliance advisory that connects policy intent to operational practice.",
    longDescription:
      "FaizZab GRC advisory helps leadership teams clarify accountability, risk ownership, control expectations and assurance routines — so governance structures can be operated, evidenced and improved over time.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 3,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "GRC Advisory | FaizZab",
    seoDescription:
      "Practical governance, risk and compliance advisory for organizations building operable GRC foundations.",
  },
  {
    slug: "ai-governance-iso-42001",
    title: "AI Governance / ISO/IEC 42001",
    shortDescription:
      "Practical AI governance and ISO/IEC 42001-oriented management system readiness support.",
    longDescription:
      "FaizZab helps organizations structure AI governance responsibilities, risk approaches, documentation and assurance practices aligned to practical AI management system expectations, including ISO/IEC 42001-oriented readiness work.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 4,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "AI Governance & ISO/IEC 42001 | FaizZab",
    seoDescription:
      "Implementation-focused AI governance and ISO/IEC 42001 readiness support from FaizZab.",
  },
  {
    slug: "privacy-dpdp",
    title: "Privacy / DPDP",
    shortDescription:
      "Practical privacy and India DPDP-oriented implementation support for organizational readiness.",
    longDescription:
      "FaizZab supports privacy programme foundations with a focus on practical implementation — including governance, process design, documentation readiness and operational accountability under India DPDP and related privacy expectations. This is not legal advice.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 5,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "Privacy & DPDP Implementation Support | FaizZab",
    seoDescription:
      "Practical privacy and DPDP-oriented implementation support for organizational readiness.",
  },
  {
    slug: "cybersecurity-governance",
    title: "Cybersecurity Governance",
    shortDescription:
      "Governance structures that connect cybersecurity controls to accountability and assurance.",
    longDescription:
      "FaizZab helps organizations strengthen cybersecurity governance — clarifying ownership, decision rights, policy frameworks, reporting and assurance routines that support sustainable security outcomes.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 6,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "Cybersecurity Governance | FaizZab",
    seoDescription:
      "Cybersecurity governance consulting focused on accountability, controls and assurance.",
  },
  {
    slug: "it-audit",
    title: "IT Audit",
    shortDescription:
      "IT audit support focused on control design, operating evidence and actionable findings.",
    longDescription:
      "FaizZab provides IT audit advisory and readiness support to help organizations prepare evidence, understand control gaps and prioritize remediation in a practical sequence.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 7,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "IT Audit Advisory | FaizZab",
    seoDescription:
      "Practical IT audit advisory and evidence readiness support from FaizZab.",
  },
  {
    slug: "sox-itgc",
    title: "SOX / ITGC",
    shortDescription:
      "Support for IT general controls and SOX-relevant control readiness.",
    longDescription:
      "FaizZab assists organizations strengthening ITGC and SOX-relevant control documentation, evidence routines and readiness for assurance activities — without guaranteeing audit outcomes.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 8,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "SOX / ITGC Support | FaizZab",
    seoDescription:
      "Practical SOX and ITGC control readiness support for organizations preparing assurance activities.",
  },
  {
    slug: "risk-management",
    title: "Risk Management",
    shortDescription:
      "Risk methodology, assessment and treatment support that leadership can operate.",
    longDescription:
      "FaizZab helps organizations establish usable risk management practices — including methodology design, assessment facilitation, treatment planning and reporting that connects risk to decisions.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 9,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "Risk Management Consulting | FaizZab",
    seoDescription:
      "Practical risk management consulting for assessment, treatment and leadership visibility.",
  },
  {
    slug: "internal-audit",
    title: "Internal Audit",
    shortDescription:
      "Internal audit readiness and advisory support for GRC and management system contexts.",
    longDescription:
      "FaizZab supports internal audit readiness — helping teams prepare scopes, evidence packs, finding quality and corrective-action discipline that strengthen assurance value.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 10,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "Internal Audit Support | FaizZab",
    seoDescription:
      "Internal audit readiness and advisory support for practical GRC assurance.",
  },
  {
    slug: "business-continuity",
    title: "Business Continuity",
    shortDescription:
      "Business continuity and disaster recovery governance with practical readiness focus.",
    longDescription:
      "FaizZab helps organizations strengthen continuity planning foundations — including scope, roles, dependencies, recovery expectations and evidence needed to demonstrate preparedness.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 11,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "Business Continuity Consulting | FaizZab",
    seoDescription:
      "Business continuity and DR readiness consulting focused on practical preparedness.",
  },
  {
    slug: "third-party-risk",
    title: "Supplier / Third-Party Risk",
    shortDescription:
      "Third-party and supplier risk practices that improve diligence and ongoing oversight.",
    longDescription:
      "FaizZab supports supplier and third-party risk programmes — including register design, due-diligence routines, contractual control considerations and ongoing monitoring discipline.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 12,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation",
    seoTitle: "Third-Party Risk Consulting | FaizZab",
    seoDescription:
      "Supplier and third-party risk consulting for diligence, oversight and evidence readiness.",
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
