import Link from "next/link";
import { COMPANY, FOOTER_LEGAL, NAV_MAIN } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-navy-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold text-white">{COMPANY.brand}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {COMPANY.legalName}
          </p>
          <p className="mt-4 text-sm text-slate-400">
            CIN: {COMPANY.cin}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            {COMPANY.registeredOffice.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_MAIN.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-slate-200 hover:text-teal-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-teal-300" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a className="hover:text-teal-300" href={`tel:${COMPANY.telephone.replace(/\s/g, "")}`}>
                {COMPANY.telephoneDisplay}
              </a>
            </li>
            <li className="pt-2 text-slate-400">
              Queries / Grievances: {COMPANY.grievances}
            </li>
          </ul>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Legal
          </p>
          <ul className="mt-3 space-y-2">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-slate-200 hover:text-teal-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p>Domain: {COMPANY.domain}</p>
        </div>
      </div>
    </footer>
  );
}
