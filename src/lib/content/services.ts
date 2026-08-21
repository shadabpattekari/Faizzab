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

/** Sensible internal links between related service pages (by slug). */
export const RELATED_SERVICE_LINKS: Record<
  string,
  { slug: string; label: string }[]
> = {
  "soc-2-readiness": [
    { slug: "grc-advisory", label: "GRC Advisory" },
    { slug: "it-audit", label: "IT Audit" },
    { slug: "risk-management", label: "Risk Management" },
    { slug: "third-party-risk", label: "Third-Party Risk" },
    {
      slug: "iso-27001-grc-readiness-assessment",
      label: "ISO 27001 & GRC Readiness Assessment",
    },
  ],
  "pci-dss-readiness": [
    { slug: "cybersecurity-governance", label: "Cybersecurity Governance" },
    { slug: "it-audit", label: "IT Audit" },
    { slug: "risk-management", label: "Risk Management" },
    { slug: "third-party-risk", label: "Third-Party Risk" },
  ],
  "nist-csf-cybersecurity-maturity": [
    { slug: "cybersecurity-governance", label: "Cybersecurity Governance" },
    { slug: "risk-management", label: "Risk Management" },
    { slug: "grc-advisory", label: "GRC Advisory" },
    {
      slug: "iso-27001-grc-readiness-assessment",
      label: "ISO 27001 & GRC Readiness Assessment",
    },
  ],
};

export const CONSULTATION_SERVICE_INTERESTS = [
  { value: "ISO 27001 & GRC Readiness Assessment", label: "ISO 27001 & GRC Readiness Assessment" },
  { value: "AI Governance / ISO 42001", label: "AI Governance / ISO 42001" },
  { value: "Privacy / DPDP", label: "Privacy / DPDP" },
  { value: "SOC 2 Readiness", label: "SOC 2 Readiness" },
  { value: "PCI DSS Readiness", label: "PCI DSS Readiness" },
  { value: "SOX / ITGC", label: "SOX / ITGC" },
  {
    value: "NIST CSF 2.0 / Cybersecurity Maturity",
    label: "NIST CSF 2.0 / Cybersecurity Maturity",
  },
  { value: "ISO Management Systems", label: "ISO Management Systems" },
  { value: "GRC Advisory", label: "GRC Advisory" },
  { value: "Cybersecurity Governance", label: "Cybersecurity Governance" },
  { value: "IT Audit", label: "IT Audit" },
  { value: "Risk Management", label: "Risk Management" },
  { value: "Internal Audit", label: "Internal Audit" },
  { value: "Business Continuity", label: "Business Continuity" },
  { value: "Third-Party Risk", label: "Third-Party Risk" },
  { value: "Other / General Consultation", label: "Other / General Consultation" },
] as const;

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
    slug: "ai-governance-iso-42001",
    title: "AI Governance / ISO/IEC 42001",
    shortDescription:
      "Practical AI governance and ISO/IEC 42001-oriented management system readiness support.",
    longDescription:
      "FaizZab helps organizations structure AI governance responsibilities, risk approaches, documentation and assurance practices aligned to practical AI management system expectations, including ISO/IEC 42001-oriented readiness work.",
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 2,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=ai-governance-iso-42001",
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
    sortOrder: 3,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=privacy-dpdp",
    seoTitle: "Privacy & DPDP Implementation Support | FaizZab",
    seoDescription:
      "Practical privacy and DPDP-oriented implementation support for organizational readiness.",
  },
  {
    slug: "soc-2-readiness",
    title: "SOC 2 Readiness & Attestation Preparation Support",
    shortDescription:
      "Practical SOC 2 readiness, control-gap assessment, evidence preparation and remediation support for SaaS, technology and service organizations.",
    longDescription: `FaizZab helps service organizations, SaaS companies, technology providers and outsourced service businesses prepare their control environment, documentation and evidence for a future SOC 2 examination performed by an appropriately qualified independent CPA/audit firm.

Engagements focus on understanding the in-scope system, reviewing Trust Services Criteria readiness, identifying control and evidence gaps, and building a realistic remediation and attestation-preparation roadmap that management and control owners can execute.

FaizZab provides readiness, implementation and attestation-preparation support. The independent SOC 2 examination and report must be performed by an appropriately qualified independent CPA/audit firm.`,
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 4,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=soc-2-readiness",
    methodology: [
      "Scope & System Understanding",
      "Control & Documentation Review",
      "Gap Assessment",
      "Evidence Readiness",
      "Remediation Roadmap",
      "Attestation Preparation Support",
    ],
    deliverables: [
      "SOC 2 readiness summary",
      "Control and evidence gap findings",
      "Prioritized remediation roadmap",
      "Evidence inventory recommendations",
      "Control-owner preparation guidance",
      "Management readiness readout",
    ],
    coverageAreas: [
      "SOC 2 readiness assessment",
      "Trust Services Criteria readiness",
      "Control environment review",
      "Governance and accountability",
      "Logical access controls",
      "User access management",
      "Change management",
      "System operations",
      "Incident management",
      "Vendor / third-party management",
      "Risk assessment",
      "Availability considerations",
      "Confidentiality considerations",
      "Processing integrity considerations where applicable",
      "Privacy considerations where applicable",
      "Policy and procedure readiness",
      "Evidence readiness",
      "Control-owner preparation",
      "Control-gap identification",
      "Remediation roadmap",
      "Evidence inventory",
      "Management readiness",
    ],
    disclaimer: `FaizZab provides readiness, implementation and attestation-preparation support. FaizZab does not issue SOC 2 reports, does not claim CPA-firm status, and does not perform the independent SOC 2 examination unless separately and lawfully authorized to do so. SOC 2 is an attestation examination — it is not a “certification” issued by FaizZab. The independent SOC 2 examination and report must be performed by an appropriately qualified independent CPA/audit firm. Outcomes depend on the organization’s control environment, evidence quality and the examining firm’s professional judgment.`,
    seoTitle: "SOC 2 Readiness & Attestation Preparation Support | FaizZab",
    seoDescription:
      "Practical SOC 2 readiness, control-gap assessment, evidence preparation and remediation support for SaaS, technology and service organizations.",
  },
  {
    slug: "pci-dss-readiness",
    title: "PCI DSS Readiness & Compliance Support",
    shortDescription:
      "Practical PCI DSS readiness, scoping, gap assessment, evidence preparation and remediation support for payment-card environments.",
    longDescription: `FaizZab supports payment businesses, fintech organizations, merchants, e-commerce businesses, service providers and other organizations that store, process or transmit payment-card information with practical PCI DSS readiness and compliance-support work.

Engagements typically help teams clarify scope and cardholder-data-environment context, review readiness against PCI DSS expectations at a practical implementation level, assess evidence maturity, and build a prioritized remediation and compliance-readiness roadmap.

FaizZab provides PCI DSS readiness and compliance-support services. Where formal QSA validation is required, the organization must engage an appropriately qualified PCI SSC-recognized assessor. FaizZab does not claim Qualified Security Assessor (QSA) status unless that status is formally obtained, does not issue PCI DSS certification, and does not guarantee compliance outcomes.`,
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 5,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=pci-dss-readiness",
    methodology: [
      "Scope",
      "Data Flow & Environment Understanding",
      "Requirement Readiness Review",
      "Evidence Assessment",
      "Gap Prioritization",
      "Remediation Roadmap",
    ],
    deliverables: [
      "PCI DSS readiness summary",
      "Scope and environment observations",
      "Prioritized gap findings",
      "Evidence readiness recommendations",
      "Remediation and compliance-readiness roadmap",
      "Management readout",
    ],
    coverageAreas: [
      "PCI DSS scope identification",
      "Cardholder data environment understanding",
      "Asset and data-flow review",
      "Network/security architecture readiness",
      "Access-control readiness",
      "Authentication controls",
      "Vulnerability-management governance",
      "Secure configuration",
      "Logging and monitoring readiness",
      "Security testing governance",
      "Policy readiness",
      "Risk management",
      "Third-party/service-provider dependencies",
      "Evidence readiness",
      "Gap assessment",
      "Remediation planning",
      "Compliance-readiness roadmap",
    ],
    disclaimer: `FaizZab provides PCI DSS readiness and compliance-support services using original implementation-focused guidance. FaizZab does not claim Qualified Security Assessor (QSA) status unless that status is formally obtained, does not issue PCI DSS certification, and does not guarantee compliance. Where formal QSA validation is required, the organization must engage an appropriately qualified PCI SSC-recognized assessor. This service does not reproduce copyrighted PCI DSS standard text and does not constitute legal advice.`,
    seoTitle: "PCI DSS Readiness & Compliance Support | FaizZab",
    seoDescription:
      "Practical PCI DSS readiness, scoping, gap assessment, evidence preparation and remediation support for payment-card environments.",
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
    sortOrder: 6,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=sox-itgc",
    seoTitle: "SOX / ITGC Support | FaizZab",
    seoDescription:
      "Practical SOX and ITGC control readiness support for organizations preparing assurance activities.",
  },
  {
    slug: "nist-csf-cybersecurity-maturity",
    title: "NIST CSF 2.0 & Cybersecurity Maturity Assessment",
    shortDescription:
      "Assess cybersecurity governance and maturity using NIST CSF 2.0 and build a practical prioritized cybersecurity improvement roadmap.",
    longDescription: `FaizZab provides a practical cybersecurity-governance and maturity-assessment service for organizations seeking to understand, prioritize and improve cybersecurity capabilities.

Assessments are structured around the NIST CSF 2.0 high-level functions — Govern, Identify, Protect, Detect, Respond and Recover — with implementation-focused discussion of current capability, evidence readiness and improvement priorities.

FaizZab is not NIST-approved, NIST-certified or NIST-accredited, and does not claim partnership with NIST. Work products are advisory and organization-specific.`,
    status: "AVAILABLE_NOW",
    isFeatured: false,
    sortOrder: 7,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=nist-csf-cybersecurity-maturity",
    methodology: [
      "Context & Scope",
      "Capability & Evidence Review",
      "Maturity Assessment across CSF Functions",
      "Prioritized Findings",
      "Roadmap Development",
      "Management Readout",
    ],
    deliverables: [
      "Cybersecurity maturity summary",
      "Prioritized findings",
      "Capability heatmap",
      "Risk-focused recommendations",
      "Evidence and documentation priorities",
      "30/60/90-day improvement roadmap",
      "Longer-term cybersecurity maturity roadmap",
    ],
    coverageAreas: [
      "Cybersecurity governance",
      "Organizational context",
      "Roles and responsibilities",
      "Policies",
      "Risk management",
      "Asset management",
      "Supply-chain risk",
      "Identity and access management",
      "Data security",
      "Platform security",
      "Technology infrastructure resilience",
      "Continuous monitoring",
      "Incident detection",
      "Incident response",
      "Recovery planning",
      "Improvement",
      "Evidence readiness",
      "Maturity assessment",
      "Prioritized cybersecurity roadmap",
      "Govern",
      "Identify",
      "Protect",
      "Detect",
      "Respond",
      "Recover",
    ],
    disclaimer: `This engagement is an advisory cybersecurity maturity and readiness assessment informed by NIST CSF 2.0 concepts. FaizZab is not NIST-approved, NIST-certified, NIST-accredited, and does not claim partnership with NIST. The service does not constitute a formal certification, regulatory determination or legal advice. Outcomes depend on the organization’s context, available evidence and management decisions.`,
    seoTitle: "NIST CSF 2.0 Cybersecurity Maturity Assessment | FaizZab",
    seoDescription:
      "Assess cybersecurity governance and maturity using NIST CSF 2.0 and build a practical prioritized cybersecurity improvement roadmap.",
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
    sortOrder: 8,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=iso-management-systems",
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
    sortOrder: 9,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=grc-advisory",
    seoTitle: "GRC Advisory | FaizZab",
    seoDescription:
      "Practical governance, risk and compliance advisory for organizations building operable GRC foundations.",
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
    sortOrder: 10,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=cybersecurity-governance",
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
    sortOrder: 11,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=it-audit",
    seoTitle: "IT Audit Advisory | FaizZab",
    seoDescription:
      "Practical IT audit advisory and evidence readiness support from FaizZab.",
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
    sortOrder: 12,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=risk-management",
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
    sortOrder: 13,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=internal-audit",
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
    sortOrder: 14,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=business-continuity",
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
    sortOrder: 15,
    ctaLabel: "Request a Consultation",
    ctaHref: "/contact?topic=consultation&interest=third-party-risk",
    seoTitle: "Third-Party Risk Consulting | FaizZab",
    seoDescription:
      "Supplier and third-party risk consulting for diligence, oversight and evidence readiness.",
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function interestLabelForSlug(slug: string | null | undefined): string | undefined {
  if (!slug) return undefined;
  const map: Record<string, string> = {
    "soc-2-readiness": "SOC 2 Readiness",
    "pci-dss-readiness": "PCI DSS Readiness",
    "nist-csf-cybersecurity-maturity": "NIST CSF 2.0 / Cybersecurity Maturity",
    "ai-governance-iso-42001": "AI Governance / ISO 42001",
    "privacy-dpdp": "Privacy / DPDP",
    "sox-itgc": "SOX / ITGC",
    "iso-management-systems": "ISO Management Systems",
    "grc-advisory": "GRC Advisory",
    "cybersecurity-governance": "Cybersecurity Governance",
    "it-audit": "IT Audit",
    "risk-management": "Risk Management",
    "internal-audit": "Internal Audit",
    "business-continuity": "Business Continuity",
    "third-party-risk": "Third-Party Risk",
    "iso-27001-grc-readiness-assessment": "ISO 27001 & GRC Readiness Assessment",
  };
  return map[slug];
}
