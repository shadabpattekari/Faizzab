import "dotenv/config";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import {
  CAPABILITY_AREAS,
  COMPANY,
  INDUSTRIES,
  PRACTICAL_APPROACH,
  PRIMARY_HEADLINE,
} from "@/lib/company";
import { SERVICES } from "@/lib/content/services";
import { ACADEMY_COURSES, GRC_PLATFORM, TOOLKIT_PRODUCT } from "@/lib/content/products";

function json(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

async function seedServices() {
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: {
        ...service,
        methodology: service.methodology ? json(service.methodology) : undefined,
        deliverables: service.deliverables ? json(service.deliverables) : undefined,
        coverageAreas: service.coverageAreas ? json(service.coverageAreas) : undefined,
        publishStatus: "PUBLISHED",
      },
      update: {
        title: service.title,
        shortDescription: service.shortDescription,
        longDescription: service.longDescription,
        status: service.status,
        isFeatured: service.isFeatured,
        sortOrder: service.sortOrder,
        ctaLabel: service.ctaLabel,
        ctaHref: service.ctaHref,
        methodology: service.methodology ? json(service.methodology) : undefined,
        deliverables: service.deliverables ? json(service.deliverables) : undefined,
        coverageAreas: service.coverageAreas ? json(service.coverageAreas) : undefined,
        disclaimer: service.disclaimer,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
        publishStatus: "PUBLISHED",
      },
    });
  }
}

async function seedAcademy() {
  for (const course of ACADEMY_COURSES) {
    await prisma.academyCourse.upsert({
      where: { slug: course.slug },
      create: {
        slug: course.slug,
        title: course.title,
        summary: course.summary,
        description: course.description,
        status: course.status,
        sortOrder: course.sortOrder,
        audience: course.audience,
        outcomes: json(course.outcomes),
        futureFeatures: json(course.futureFeatures),
        seoTitle: course.seoTitle,
        seoDescription: course.seoDescription,
        publishStatus: "PUBLISHED",
      },
      update: {
        title: course.title,
        summary: course.summary,
        description: course.description,
        status: course.status,
        sortOrder: course.sortOrder,
        audience: course.audience,
        outcomes: json(course.outcomes),
        futureFeatures: json(course.futureFeatures),
        seoTitle: course.seoTitle,
        seoDescription: course.seoDescription,
        publishStatus: "PUBLISHED",
      },
    });
  }
}

async function seedProducts() {
  await prisma.toolkitProduct.upsert({
    where: { slug: TOOLKIT_PRODUCT.slug },
    create: {
      slug: TOOLKIT_PRODUCT.slug,
      title: TOOLKIT_PRODUCT.title,
      subtitle: TOOLKIT_PRODUCT.subtitle,
      description: TOOLKIT_PRODUCT.description,
      status: TOOLKIT_PRODUCT.status,
      contents: json(TOOLKIT_PRODUCT.contents),
      licenceSummary: TOOLKIT_PRODUCT.licenceSummary,
      disclaimer: TOOLKIT_PRODUCT.disclaimer,
      ctaLabel: "Join the launch list",
      seoTitle: TOOLKIT_PRODUCT.seoTitle,
      seoDescription: TOOLKIT_PRODUCT.seoDescription,
      publishStatus: "PUBLISHED",
    },
    update: {
      title: TOOLKIT_PRODUCT.title,
      subtitle: TOOLKIT_PRODUCT.subtitle,
      description: TOOLKIT_PRODUCT.description,
      status: TOOLKIT_PRODUCT.status,
      contents: json(TOOLKIT_PRODUCT.contents),
      licenceSummary: TOOLKIT_PRODUCT.licenceSummary,
      disclaimer: TOOLKIT_PRODUCT.disclaimer,
      ctaLabel: "Join the launch list",
      seoTitle: TOOLKIT_PRODUCT.seoTitle,
      seoDescription: TOOLKIT_PRODUCT.seoDescription,
      publishStatus: "PUBLISHED",
    },
  });

  const existingPlatform = await prisma.grcPlatformContent.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  const platformData = {
    title: GRC_PLATFORM.title,
    status: GRC_PLATFORM.status,
    summary: GRC_PLATFORM.summary,
    description: GRC_PLATFORM.description,
    features: json(GRC_PLATFORM.features),
    seoTitle: GRC_PLATFORM.seoTitle,
    seoDescription: GRC_PLATFORM.seoDescription,
  };
  if (existingPlatform) {
    await prisma.grcPlatformContent.update({ where: { id: existingPlatform.id }, data: platformData });
  } else {
    await prisma.grcPlatformContent.create({ data: platformData });
  }
}

async function seedSettings() {
  const settings: Record<string, Prisma.InputJsonValue> = {
    legalName: json(COMPANY.legalName),
    cin: json(COMPANY.cin),
    registeredOffice: json(COMPANY.registeredOffice),
    grievancesContact: json(COMPANY.grievances),
    contactInfo: json({
      email: COMPANY.email,
      telephone: COMPANY.telephone,
      domain: COMPANY.domain,
    }),
    socialLinks: json({ linkedin: "", youtube: "" }),
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
}

async function seedHomepage() {
  const sections = [
    {
      key: "hero",
      title: PRIMARY_HEADLINE,
      content: json({
        eyebrow: "Governance · Risk · Compliance",
        headline: PRIMARY_HEADLINE,
        primaryCta: { label: "Request a Consultation", href: "/contact?topic=consultation" },
      }),
      isVisible: true,
      sortOrder: 10,
    },
    {
      key: "capabilities",
      title: "Practical GRC capability",
      content: json({ items: CAPABILITY_AREAS }),
      isVisible: true,
      sortOrder: 20,
    },
    {
      key: "approach",
      title: "Our practical approach",
      content: json({ steps: PRACTICAL_APPROACH }),
      isVisible: true,
      sortOrder: 30,
    },
    {
      key: "industries",
      title: "Industries we support",
      content: json({ items: INDUSTRIES }),
      isVisible: true,
      sortOrder: 40,
    },
  ];
  for (const section of sections) {
    await prisma.homepageSection.upsert({
      where: { key: section.key },
      create: section,
      update: section,
    });
  }
}

async function seedSeo() {
  const entries = [
    {
      path: "/",
      title: `${COMPANY.brand} | Governance. Risk. Compliance.`,
      description:
        "Practical consulting and implementation support across governance, risk, compliance, information security, privacy, AI governance and audit readiness.",
    },
    ...SERVICES.map((service) => ({
      path: `/services/${service.slug}`,
      title: service.seoTitle,
      description: service.seoDescription,
    })),
    {
      path: "/academy",
      title: "FaizZab Academy | Practical GRC Learning",
      description:
        "Upcoming practical courses for GRC, AI governance, privacy and information security professionals.",
    },
    {
      path: "/toolkits",
      title: TOOLKIT_PRODUCT.seoTitle,
      description: TOOLKIT_PRODUCT.seoDescription,
    },
    {
      path: "/grc-platform",
      title: GRC_PLATFORM.seoTitle,
      description: GRC_PLATFORM.seoDescription,
    },
  ];
  for (const entry of entries) {
    await prisma.seoEntry.upsert({
      where: { path: entry.path },
      create: entry,
      update: { title: entry.title, description: entry.description },
    });
  }
}

async function main() {
  await seedServices();
  await seedAcademy();
  await seedProducts();
  await seedSettings();
  await seedHomepage();
  await seedSeo();
  console.log("FaizZab content seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
