import type { FAQ } from "@prisma/client";

export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: FAQ[]; heading?: string }) {
  if (!faqs.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl font-bold text-navy-950">{heading}</h2>
      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-navy-950 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span>{faq.question}</span>
                <span className="text-teal-700 transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p className="mt-4 leading-7 text-slate-600 whitespace-pre-wrap">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
