import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers for FaizZab website content, services and planned products.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />
      <h1 className="font-display text-4xl font-bold text-navy-950">Disclaimer</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 20 August 2026</p>
      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Legal review required:</strong> This draft disclaimer must be reviewed by
        qualified legal counsel before publication or reliance.
      </div>

      <div className="prose-legal mt-10">
        <h2>General information</h2>
        <p>
          Content published by {COMPANY.legalName} under the {COMPANY.brand} brand is provided
          for general informational and educational purposes. It should be assessed against your
          organization&apos;s own context and professional requirements.
        </p>

        <h2>No legal advice</h2>
        <p>
          Website content, privacy and DPDP implementation support, toolkits, courses and
          consulting information do not constitute legal advice. Obtain advice from appropriately
          qualified legal counsel for legal interpretation, obligations and decisions.
        </p>

        <h2>No certification or accreditation</h2>
        <p>
          FaizZab does not issue accredited ISO certification. A readiness assessment is not an
          accredited certification audit. Use of consulting support, educational content or a
          toolkit does not guarantee certification, audit, regulatory, customer or commercial
          outcomes.
        </p>

        <h2>Assessment and technical scope</h2>
        <p>
          Readiness and advisory work is limited to the agreed scope and information made
          available. Penetration testing, vulnerability assessment, technical security testing,
          legal review, remediation and implementation are not included unless separately and
          expressly agreed.
        </p>

        <h2>Standards and third-party rights</h2>
        <p>
          References to ISO and other standards are descriptive. Website and product materials do
          not reproduce copyrighted standards text. Standards, laws and guidance may change, and
          users should consult current authoritative sources.
        </p>

        <h2>Planned offerings</h2>
        <p>
          FaizZab Academy and the starter toolkit are coming soon. The FaizZab GRC Platform is in
          development. Planned features, contents and descriptions may change and should not be
          treated as commitments, warranties or release dates.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this disclaimer may be sent to{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </div>
    </section>
  );
}
