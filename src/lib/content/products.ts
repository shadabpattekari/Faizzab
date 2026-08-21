import { BUSINESS_STATUS } from "@/lib/company";

export const ACADEMY_COURSES = [
  {
    slug: "iso-42001-practical-ai-management-system-implementer",
    title: "ISO/IEC 42001 Practical AI Management System Implementer",
    summary:
      "A practical course path for implementing AI management system foundations aligned to ISO/IEC 42001 expectations.",
    description:
      "This upcoming FaizZab Academy course is designed for professionals who need to turn AI governance intent into operable management-system practices — including roles, risk approaches, documentation and evidence habits. Course delivery features such as lessons, practical labs, simulated organizations, evidence packs, assignments, quizzes, hints, model answers, capstones, instructor feedback and certificates are planned for future Academy releases.",
    status: BUSINESS_STATUS.academy.key,
    sortOrder: 1,
    audience: "GRC, risk, compliance, AI governance and information security practitioners.",
    outcomes: [
      "Understand practical AI management system building blocks",
      "Structure implementation work into operable steps",
      "Prepare evidence-oriented documentation habits",
    ],
    futureFeatures: [
      "Lessons",
      "Practical labs",
      "Simulated organizations",
      "Evidence packs",
      "Assignments",
      "Quizzes",
      "Hints",
      "Model answers",
      "Capstones",
      "Instructor feedback",
      "Certificates",
    ],
    seoTitle: "ISO/IEC 42001 Implementer Course | FaizZab Academy",
    seoDescription:
      "Coming soon: practical ISO/IEC 42001 AI management system implementer course from FaizZab Academy.",
  },
  {
    slug: "ai-risk-management-practitioner",
    title: "AI Risk Management Practitioner",
    summary:
      "Practitioner-focused learning for identifying, assessing and treating AI-related risks in organizational contexts.",
    description:
      "This upcoming course focuses on practical AI risk management — helping practitioners connect AI use cases to risk methods, treatment decisions and assurance evidence. Full LMS features are planned for future Academy releases and are not available yet.",
    status: BUSINESS_STATUS.academy.key,
    sortOrder: 2,
    audience: "Risk, compliance, AI product and security professionals.",
    outcomes: [
      "Apply structured AI risk thinking",
      "Document risk decisions for assurance",
      "Connect risk treatment to governance routines",
    ],
    futureFeatures: [
      "Lessons",
      "Practical labs",
      "Assignments",
      "Quizzes",
      "Capstones",
      "Certificates",
    ],
    seoTitle: "AI Risk Management Practitioner | FaizZab Academy",
    seoDescription:
      "Coming soon: AI Risk Management Practitioner course from FaizZab Academy.",
  },
  {
    slug: "india-dpdp-act-rules-practical-implementation",
    title: "India DPDP Act & Rules Practical Implementation",
    summary:
      "Practical implementation-oriented learning for India DPDP readiness work across organizational processes.",
    description:
      "This upcoming FaizZab Academy course is oriented toward practical DPDP implementation considerations for organizational programmes. It is educational in nature and does not constitute legal advice. Full learning platform features are planned and not yet available.",
    status: BUSINESS_STATUS.academy.key,
    sortOrder: 3,
    audience: "Privacy, legal operations, compliance and GRC professionals.",
    outcomes: [
      "Map practical DPDP implementation workstreams",
      "Strengthen documentation and accountability habits",
      "Prepare operational readiness checklists",
    ],
    futureFeatures: [
      "Lessons",
      "Evidence packs",
      "Assignments",
      "Quizzes",
      "Instructor feedback",
      "Certificates",
    ],
    seoTitle: "India DPDP Practical Implementation | FaizZab Academy",
    seoDescription:
      "Coming soon: India DPDP Act & Rules practical implementation course from FaizZab Academy.",
  },
  {
    slug: "iso-27701-2025-practical-pims-implementer",
    title: "ISO/IEC 27701:2025 Practical PIMS Implementer",
    summary:
      "Implementation-focused learning for privacy information management system foundations.",
    description:
      "This upcoming course supports practitioners building practical PIMS-oriented foundations aligned to ISO/IEC 27701:2025 expectations. FaizZab Academy learning features are planned for future release.",
    status: BUSINESS_STATUS.academy.key,
    sortOrder: 4,
    audience: "Privacy, information security and GRC implementers.",
    outcomes: [
      "Structure PIMS implementation work",
      "Connect privacy controls to evidence",
      "Prepare for continual improvement routines",
    ],
    futureFeatures: [
      "Lessons",
      "Practical labs",
      "Evidence packs",
      "Assignments",
      "Certificates",
    ],
    seoTitle: "ISO/IEC 27701:2025 PIMS Implementer | FaizZab Academy",
    seoDescription:
      "Coming soon: ISO/IEC 27701:2025 practical PIMS implementer course from FaizZab Academy.",
  },
  {
    slug: "iso-27001-practical-implementer",
    title: "ISO/IEC 27001 Practical Implementer",
    summary:
      "A practical implementer path for ISO/IEC 27001 information security management system work.",
    description:
      "This upcoming course focuses on practical ISMS implementation — scope, risk, controls readiness, documented information and evidence habits. Full Academy LMS capabilities are planned and not yet live.",
    status: BUSINESS_STATUS.academy.key,
    sortOrder: 5,
    audience: "Information security, GRC and compliance practitioners.",
    outcomes: [
      "Plan practical ISMS implementation steps",
      "Improve evidence readiness discipline",
      "Prioritize remediation work realistically",
    ],
    futureFeatures: [
      "Lessons",
      "Simulated organizations",
      "Evidence packs",
      "Assignments",
      "Quizzes",
      "Capstones",
      "Certificates",
    ],
    seoTitle: "ISO/IEC 27001 Practical Implementer | FaizZab Academy",
    seoDescription:
      "Coming soon: ISO/IEC 27001 practical implementer course from FaizZab Academy.",
  },
  {
    slug: "grc-analyst-practitioner",
    title: "GRC Analyst / Practitioner",
    summary:
      "Foundational practitioner learning for governance, risk and compliance operating routines.",
    description:
      "This upcoming FaizZab Academy course is designed for early and mid-career professionals building practical GRC analyst capabilities across governance, risk, controls and evidence workflows. Academy platform features are planned for future release.",
    status: BUSINESS_STATUS.academy.key,
    sortOrder: 6,
    audience: "Aspiring and practicing GRC analysts.",
    outcomes: [
      "Operate core GRC analyst routines",
      "Document risk and control work clearly",
      "Support audit and evidence readiness",
    ],
    futureFeatures: [
      "Lessons",
      "Practical labs",
      "Assignments",
      "Quizzes",
      "Hints",
      "Model answers",
      "Certificates",
    ],
    seoTitle: "GRC Analyst / Practitioner | FaizZab Academy",
    seoDescription:
      "Coming soon: GRC Analyst / Practitioner course from FaizZab Academy.",
  },
] as const;

export function getCourseBySlug(slug: string) {
  return ACADEMY_COURSES.find((c) => c.slug === slug);
}

export const TOOLKIT_PRODUCT = {
  slug: "iso-27001-grc-starter-toolkit-2026",
  title: "FaizZab ISO 27001 GRC Starter Toolkit — Edition 2026",
  subtitle: "Practical starter registers and workbooks for ISMS and GRC foundations",
  description: `The FaizZab ISO 27001 GRC Starter Toolkit — Edition 2026 is designed to help organizations begin structured information-security and GRC documentation work with practical, adaptable templates.

Initial status: COMING SOON. Join Toolkit Launch List to be notified when the toolkit becomes available for purchase request. Online payment is not offered in this phase; purchase requests will be handled through a guided commercial process when the product is released.

Licence positioning: Single Legal Entity Internal-Use Licence. Final licence wording will be flagged for qualified legal review before commercial release.`,
  status: BUSINESS_STATUS.toolkit.key as "COMING_SOON" | "AVAILABLE_NOW" | "IN_DEVELOPMENT",
  contents: [
    "Information Security Risk Register",
    "Statement of Applicability Support Workbook",
    "Risk Treatment Plan",
    "Information Asset Register",
    "Supplier / Third-Party Register",
    "Access Review Register",
    "Security Incident Register",
    "Legal / Regulatory / Contractual Register",
    "Business Continuity / DR Register",
    "Context, Scope & Interested Parties Workbook",
    "Evidence Readiness Checklist",
    "90-Day Implementation Roadmap",
    "Quick Start Guide",
    "Buyer Instructions",
    "Licensing Terms",
    "Legal Disclaimer",
  ],
  licenceSummary: `Single Legal Entity Internal-Use Licence.

The buyer may adapt the toolkit for internal use within its own legal entity.

The buyer may not resell, redistribute, sublicense, publish publicly, rebrand and resell, or commercially distribute modified copies.

Final licence wording is flagged for qualified legal review before commercial release.`,
  disclaimer: `This toolkit provides practical starter documentation aids. It does not reproduce copyrighted ISO standard text. It is not a certification, accreditation, or legal advice product. Use of the toolkit does not guarantee ISO certification or audit outcomes. Content should be adapted to your organization's context by competent professionals.`,
  seoTitle: "ISO 27001 GRC Starter Toolkit 2026 | FaizZab",
  seoDescription:
    "FaizZab ISO 27001 GRC Starter Toolkit — Edition 2026. Coming soon. Join Toolkit Launch List.",
} as const;

export const GRC_PLATFORM = {
  title: "FaizZab GRC Platform",
  status: BUSINESS_STATUS.grcPlatform.key,
  summary:
    "A future FaizZab product direction for governance, risk, controls, compliance, evidence and audit-readiness workflows — currently in development.",
  description: `The FaizZab GRC Platform is in development. It is intended to support organizations seeking clearer operational visibility across governance, risk, controls, compliance evidence, audit readiness, workflow, corrective actions and management reporting.

The platform is not available for use today. Register interest to receive updates as development progresses. This page describes intended product direction only and does not claim current operational capability.`,
  features: [
    "Governance structures and accountability visibility",
    "Risk and control tracking concepts",
    "Compliance evidence organization",
    "Audit readiness workflow support",
    "Corrective action follow-through",
    "Management visibility",
  ],
  seoTitle: "FaizZab GRC Platform — In Development",
  seoDescription:
    "FaizZab GRC Platform is in development. Register interest for updates on governance, risk, compliance and evidence workflows.",
} as const;
