import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getPublishedCourses } from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

/** Set NEXT_PUBLIC_ACADEMY_URL (e.g. https://academy.faizzab.com) once the Academy portal is public. */
const ACADEMY_URL = process.env.NEXT_PUBLIC_ACADEMY_URL?.trim() || "";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/academy",
    title: "Academy — Practitioner Courses and GRC Internships",
    description:
      "FaizZab Academy: practical ISO/IEC 27001 and GRC learning with module workbooks, reviewed labs and 2, 3 and 6-month internships.",
  });
}

export default async function AcademyPage() {
  const courses = await getPublishedCourses();
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
      options: courses.map((course) => ({
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
            Practitioner learning that turns governance and compliance concepts into real
            implementation work: short lessons, one workbook per module, reviewed practical labs
            and GRC internships with mentor review. The first course is ISO/IEC 27001
            Implementation Practitioner.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {ACADEMY_URL ? (
              <a
                href={ACADEMY_URL}
                className="inline-flex rounded-md bg-teal-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-800"
              >
                Go to FaizZab Academy
              </a>
            ) : null}
            <a
              href="#launch-list"
              className={
                ACADEMY_URL
                  ? "inline-flex rounded-md bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/20"
                  : "inline-flex rounded-md bg-teal-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-800"
              }
            >
              Join Launch List
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">Planned courses</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Courses open in stages, starting with ISO/IEC 27001 Implementation Practitioner. Join the
          launch list to hear when enrolment opens for the course you need.
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
            How you learn at FaizZab Academy
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Short practical lessons with worked examples",
              "One workbook per module to practise in",
              "Practical labs reviewed before they count",
              "Module assessments and a capstone",
            ].map(
              (feature) => (
                <div key={feature} className="rounded-lg border border-slate-200 bg-white p-5">
                  <p className="font-semibold text-navy-950">{feature}</p>
                </div>
              ),
            )}
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-500">
            Course content and features may be refined as each course opens.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">GRC internships</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          One internship programme in 2, 3 or 6-month formats, with modules released week by week,
          practical labs, a project and mentor review.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-xl font-bold text-navy-950">Academic pathway</h3>
            <p className="mt-3 leading-7 text-slate-600">
              For college students through institutions that partner with FaizZab Integrity.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-xl font-bold text-navy-950">Professional pathway</h3>
            <p className="mt-3 leading-7 text-slate-600">
              For graduates, job seekers, working professionals and career switchers who enrol
              individually.
            </p>
          </article>
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
