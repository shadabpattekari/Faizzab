import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ACADEMY_COURSES } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Academy — Coming Soon",
  description:
    "FaizZab Academy is coming soon with practical learning paths across AI governance, privacy, ISO 27001 and GRC.",
  alternates: { canonical: "/academy" },
};

const academyFields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email" as const, required: true },
  { name: "company", label: "Organization" },
  { name: "jobTitle", label: "Job title" },
  {
    name: "courseInterest",
    label: "Course of interest",
    type: "select" as const,
    required: true,
    options: ACADEMY_COURSES.map((course) => ({
      value: course.title,
      label: course.title,
    })),
  },
  { name: "country", label: "Country" },
  {
    name: "privacyAccepted",
    label: "I have read and accept the Privacy Policy.",
    type: "checkbox" as const,
    required: true,
  },
];

export default function AcademyPage() {
  const courses = [...ACADEMY_COURSES].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "Academy" }]} />
          </div>
          <StatusBadge status="COMING_SOON" />
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">FaizZab Academy</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Planned practitioner learning focused on turning governance and compliance concepts
            into structured implementation work, useful evidence and stronger operating habits.
          </p>
          <a
            href="#launch-list"
            className="mt-8 inline-flex rounded-md bg-teal-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            Join Launch List
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">Planned courses</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Every course shown below is coming soon. Enrolment, lessons and certificates are not
          currently available.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.slug}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6"
            >
              <StatusBadge status={course.status} className="self-start" />
              <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
                {course.title}
              </h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600">{course.summary}</p>
              <Link
                href={`/academy/${course.slug}`}
                className="mt-5 font-semibold text-teal-700 hover:text-teal-800"
              >
                Preview course <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Planned learning experience
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Practical lessons", "Applied labs", "Evidence-oriented assignments", "Capstone pathways"].map(
              (feature) => (
                <div key={feature} className="rounded-lg border border-slate-200 bg-white p-5">
                  <p className="font-semibold text-navy-950">{feature}</p>
                </div>
              ),
            )}
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-500">
            These capabilities describe planned product direction and may change before release.
          </p>
        </div>
      </section>

      <section id="launch-list" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <StatusBadge status="COMING_SOON" />
            <h2 className="mt-4 font-display text-3xl font-bold text-navy-950">
              Join the Academy launch list
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Register your interest to receive updates about the course area most relevant to
              you.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm
              endpoint="/api/enquiries/academy"
              fields={academyFields}
              submitLabel="Join Launch List"
              successMessage="Thank you. You have joined the FaizZab Academy launch list."
              footer={
                <p className="text-xs leading-5 text-slate-500">
                  See the{" "}
                  <Link href="/privacy-policy" className="underline hover:text-teal-700">
                    Privacy Policy
                  </Link>{" "}
                  for how your details are handled.
                </p>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
