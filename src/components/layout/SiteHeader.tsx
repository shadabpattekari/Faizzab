"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY, NAV_MAIN } from "@/lib/company";
import { ButtonLink } from "@/components/ui/Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          <span className="font-display text-xl font-bold tracking-tight text-navy-950 sm:text-2xl">
            {COMPANY.brand}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-[11px]">
            Integrity · GRC · Implementation
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {NAV_MAIN.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" size="sm">
            Request a Consultation
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-slate-200 bg-white lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Mobile">
          {NAV_MAIN.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-teal-700 px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Request a Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
