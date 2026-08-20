import Link from "next/link";

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-navy-950 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.3),transparent_42%)]" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-7 flex items-center justify-center gap-3 text-white">
          <span className="grid size-11 place-items-center rounded-xl bg-teal-600 text-lg font-bold shadow-lg">
            FZ
          </span>
          <span>
            <span className="block font-display text-2xl font-bold">FaizZab</span>
            <span className="block text-xs font-semibold tracking-[0.18em] text-teal-300">
              ADMIN PORTAL
            </span>
          </span>
        </Link>
        <section className="rounded-2xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9">
          {children}
        </section>
      </div>
    </main>
  );
}
