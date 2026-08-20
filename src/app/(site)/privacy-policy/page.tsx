import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the FaizZab website and website enquiries.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="font-display text-4xl font-bold text-navy-950">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 20 August 2026</p>
      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Legal review required:</strong> This draft policy must be reviewed by qualified
        legal counsel before publication or reliance.
      </div>

      <div className="prose-legal mt-10">
        <p>
          This Privacy Policy explains how {COMPANY.legalName} (operating under the brand{" "}
          {COMPANY.brand}) collects, uses and protects personal information submitted through
          this website.
        </p>

        <h2>Information we collect</h2>
        <p>Depending on the form or service you use, we may collect:</p>
        <ul>
          <li>Name, email address, telephone number and job title;</li>
          <li>Organization, country, industry and organization-size information;</li>
          <li>
            Enquiry details, areas of interest, course or product interest, current readiness
            status and requested timeframe;
          </li>
          <li>
            Technical and security information such as IP address, browser user agent and
            submission time; and
          </li>
          <li>Administrative account and session information for authorized administrators.</li>
        </ul>

        <h2>How we use information</h2>
        <p>We may use personal information to:</p>
        <ul>
          <li>Review, route and respond to enquiries;</li>
          <li>Scope requested consulting or assessment work;</li>
          <li>Manage Academy, toolkit and GRC Platform interest lists;</li>
          <li>Protect the website, prevent abuse and maintain administrative security;</li>
          <li>Keep appropriate business, compliance and audit records; and</li>
          <li>Meet applicable legal and regulatory obligations.</li>
        </ul>

        <h2>Sharing and service providers</h2>
        <p>
          Information may be made available to personnel and service providers who need it to
          operate the website, deliver communications, host data or support business processes.
          We do not state that personal information is sold. Providers may process information
          in locations outside your state or country, subject to applicable requirements and
          appropriate arrangements.
        </p>

        <h2>Retention</h2>
        <p>
          We retain information only for as long as reasonably necessary for the purposes
          described above, including enquiry follow-up, business records, security, dispute
          handling and legal obligations. Retention periods may differ by record type.
        </p>

        <h2>Security</h2>
        <p>
          We use reasonable administrative and technical measures intended to protect
          information. No website, transmission or storage system can be guaranteed to be
          completely secure.
        </p>

        <h2>Your requests</h2>
        <p>
          Subject to applicable law, you may ask about personal information held about you or
          request correction, updating, withdrawal of a prior request, or deletion where
          appropriate. Some information may need to be retained for legal, security or legitimate
          business reasons.
        </p>

        <h2>Cookies</h2>
        <p>
          The public website does not use marketing trackers as currently configured. An
          essential <code>fz_session</code> cookie is used only for authenticated
          administration. See the <a href="/cookie-policy">Cookie Policy</a> for details.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy when practices, services or legal requirements change. The
          date at the top identifies the latest revision.
        </p>

        <h2>Contact and grievances</h2>
        <p>
          Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <br />
          Phone:{" "}
          <a href={`tel:${COMPANY.telephone.replace(/\s/g, "")}`}>
            {COMPANY.telephoneDisplay}
          </a>
          <br />
          Queries / Grievances: {COMPANY.grievances}
          <br />
          Registered office: {COMPANY.registeredOffice.singleLine}
        </p>
      </div>
    </section>
  );
}
