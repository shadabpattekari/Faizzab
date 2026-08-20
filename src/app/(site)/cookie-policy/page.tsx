import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for the FaizZab website.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />
      <h1 className="font-display text-4xl font-bold text-navy-950">Cookie Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 20 August 2026</p>
      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Legal review required:</strong> This draft policy must be reviewed by qualified
        legal counsel before publication or reliance.
      </div>

      <div className="prose-legal mt-10">
        <p>
          This policy explains the cookies used on the website operated by{" "}
          {COMPANY.legalName} under the brand {COMPANY.brand}.
        </p>

        <h2>Current cookie use</h2>
        <p>
          The public-facing website does not set marketing or advertising trackers as currently
          configured. The website uses one essential session cookie for authorized
          administrators:
        </p>
        <div className="overflow-x-auto">
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="px-3 py-3 font-semibold text-navy-950">Cookie</th>
                <th className="px-3 py-3 font-semibold text-navy-950">Purpose</th>
                <th className="px-3 py-3 font-semibold text-navy-950">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="px-3 py-3 font-mono text-slate-700">fz_session</td>
                <td className="px-3 py-3 text-slate-700">
                  Authenticates authorized administrators and protects access to administration
                  functions. It is not used for public-user marketing or advertising.
                </td>
                <td className="px-3 py-3 text-slate-700">
                  Up to 7 days, or earlier on logout or invalidation.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Cookie safeguards</h2>
        <p>
          The <code>fz_session</code> cookie is configured as HTTP-only, uses SameSite=Lax and is
          sent over secure connections in production. Its purpose is strictly necessary
          administrative authentication.
        </p>

        <h2>Your browser controls</h2>
        <p>
          Browsers allow you to inspect, block and delete cookies. Blocking the essential
          administrative session cookie will prevent authorized administrators from remaining
          signed in, but it is not needed to browse ordinary public pages.
        </p>

        <h2>Future changes</h2>
        <p>
          If analytics, marketing or other non-essential tracking is introduced, this policy and
          any required consent mechanism should be updated before that tracking is activated. No
          such trackers are documented as active at the date shown above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about cookie use may be sent to{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </div>
    </section>
  );
}
