import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the FaizZab website.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Terms of Use" }]} />
      <h1 className="font-display text-4xl font-bold text-navy-950">Terms of Use</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 20 August 2026</p>
      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Legal review required:</strong> These draft terms must be reviewed by qualified
        legal counsel before publication or reliance.
      </div>

      <div className="prose-legal mt-10">
        <p>
          These Terms of Use apply to your use of the website operated by{" "}
          {COMPANY.legalName} under the brand {COMPANY.brand}. By accessing the website, you
          agree to use it in accordance with these terms and applicable law.
        </p>

        <h2>Website information</h2>
        <p>
          Website content is provided for general information. It does not create a client,
          adviser, fiduciary or other professional relationship. A consulting engagement exists
          only after a written agreement has been accepted by the relevant parties.
        </p>

        <h2>Service and product status</h2>
        <p>
          Consulting and the ISO 27001 &amp; GRC Readiness Assessment are available now, subject
          to scope and agreement. FaizZab Academy and the starter toolkit are coming soon. The
          FaizZab GRC Platform is in development. Descriptions of planned offerings are not
          promises of functionality, pricing or release dates.
        </p>

        <h2>Acceptable use</h2>
        <p>You must not:</p>
        <ul>
          <li>Use the website unlawfully, fraudulently or to infringe another person&apos;s rights;</li>
          <li>Attempt unauthorized access to administrative areas, accounts, systems or data;</li>
          <li>Introduce malicious code or interfere with website availability or security;</li>
          <li>Submit false, misleading, abusive or unsolicited promotional material; or</li>
          <li>Copy or exploit website content beyond what applicable law permits.</li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          Unless stated otherwise, website text, branding, graphics, structure and original
          materials are owned by or licensed to {COMPANY.legalName}. Third-party names,
          standards and marks remain the property of their respective owners. References to ISO
          standards do not imply endorsement, accreditation or certification authority.
        </p>

        <h2>Links and third-party resources</h2>
        <p>
          Links to third-party websites may be provided for convenience. We do not control those
          websites and are not responsible for their availability, content or privacy practices.
        </p>

        <h2>No warranties</h2>
        <p>
          The website is provided on an &quot;as is&quot; and &quot;as available&quot; basis to
          the extent permitted by law. We do not warrant uninterrupted availability, absence of
          errors or fitness of general website content for a particular purpose.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by applicable law, {COMPANY.legalName} will not be liable for
          indirect, incidental or consequential loss arising solely from use of, or inability to
          use, this website. Nothing in these terms excludes liability that cannot lawfully be
          excluded.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms and website content. Continued use after an update is subject
          to the revised terms shown on this page.
        </p>

        <h2>Governing law and contact</h2>
        <p>
          These terms are intended to be governed by the laws of India, subject to mandatory
          applicable law and final legal review. Questions may be sent to{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Registered office:{" "}
          {COMPANY.registeredOffice.singleLine}.
        </p>
      </div>
    </section>
  );
}
