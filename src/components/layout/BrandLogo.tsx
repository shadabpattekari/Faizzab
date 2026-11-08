import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

/** Final FaizZab logo (version for dark backgrounds). Full lockup from sm up, FZ symbol on phones. */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${COMPANY.brand} home`}
      className={`inline-flex items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200 ${className}`}
    >
      <Image
        src="/brand/faizzab-symbol-dark.png"
        alt={COMPANY.brand}
        width={550}
        height={512}
        priority
        className="h-9 w-auto sm:hidden"
      />
      <Image
        src="/brand/faizzab-lockup-dark.png"
        alt={`${COMPANY.brand} Integrity — Cybersecurity, GRC, Compliance, Academy`}
        width={1073}
        height={320}
        priority
        className="hidden h-12 w-auto sm:block"
      />
    </Link>
  );
}
