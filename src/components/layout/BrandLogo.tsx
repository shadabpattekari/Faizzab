import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

/** Final FaizZab logo (version for dark backgrounds): the full lockup on every screen size. */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${COMPANY.brand} home`}
      className={`inline-flex items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200 ${className}`}
    >
      <Image
        src="/brand/faizzab-lockup-dark.png"
        alt={`${COMPANY.brand} Integrity — Cybersecurity, GRC, Compliance, Academy`}
        width={1073}
        height={320}
        priority
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
