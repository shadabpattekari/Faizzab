import type {
  AcademyCourse,
  FAQ,
  GrcPlatformContent,
  HomepageSection,
  Insight,
  ProductStatus,
  Service,
  ToolkitProduct,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { COMPANY } from "@/lib/company";
import { SERVICES, type ServiceContent } from "@/lib/content/services";
import {
  ACADEMY_COURSES,
  GRC_PLATFORM,
  TOOLKIT_PRODUCT,
} from "@/lib/content/products";

export function toolkitCtaLabel(status: ProductStatus | string): string {
  return status === "AVAILABLE_NOW"
    ? "Request Toolkit Purchase"
    : "Join Toolkit Launch List";
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter((item): item is string => typeof item === "string");
}

export function mapServiceRecord(service: Service): ServiceContent {
  return {
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    longDescription: service.longDescription,
    status: service.status,
    isFeatured: service.isFeatured,
    sortOrder: service.sortOrder,
    ctaLabel: service.ctaLabel || "Request a Consultation",
    ctaHref: service.ctaHref || "/contact?topic=consultation",
    methodology: asStringArray(service.methodology),
    deliverables: asStringArray(service.deliverables),
    coverageAreas: asStringArray(service.coverageAreas),
    disclaimer: service.disclaimer || undefined,
    seoTitle: service.seoTitle || service.title,
    seoDescription: service.seoDescription || service.shortDescription,
  };
}

export type PublicCourse = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: ProductStatus;
  sortOrder: number;
  audience?: string | null;
  outcomes?: string[];
  futureFeatures?: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
};

function mapCourse(course: AcademyCourse): PublicCourse {
  return {
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    description: course.description,
    status: course.status,
    sortOrder: course.sortOrder,
    audience: course.audience,
    outcomes: asStringArray(course.outcomes),
    futureFeatures: asStringArray(course.futureFeatures),
    seoTitle: course.seoTitle,
    seoDescription: course.seoDescription,
  };
}

export type PublicToolkit = {
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  status: ProductStatus;
  contents: string[];
  licenceSummary: string | null;
  disclaimer: string | null;
  ctaLabel: string;
  seoTitle: string | null;
  seoDescription: string | null;
  publishStatus: string;
};

function mapToolkit(toolkit: ToolkitProduct): PublicToolkit {
  return {
    slug: toolkit.slug,
    title: toolkit.title,
    subtitle: toolkit.subtitle,
    description: toolkit.description,
    status: toolkit.status,
    contents: asStringArray(toolkit.contents) || [],
    licenceSummary: toolkit.licenceSummary,
    disclaimer: toolkit.disclaimer,
    ctaLabel: toolkitCtaLabel(toolkit.status),
    seoTitle: toolkit.seoTitle,
    seoDescription: toolkit.seoDescription,
    publishStatus: toolkit.publishStatus,
  };
}

export type PublicGrcPlatform = {
  id?: string;
  title: string;
  status: ProductStatus;
  summary: string;
  description: string;
  features: string[];
  seoTitle: string | null;
  seoDescription: string | null;
};

function mapGrc(platform: GrcPlatformContent): PublicGrcPlatform {
  return {
    id: platform.id,
    title: platform.title,
    status: platform.status,
    summary: platform.summary,
    description: platform.description,
    features: asStringArray(platform.features) || [],
    seoTitle: platform.seoTitle,
    seoDescription: platform.seoDescription,
  };
}

export async function getPublishedServices(): Promise<ServiceContent[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { publishStatus: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map(mapServiceRecord);
  } catch {
    return [...SERVICES].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export async function getPublishedServiceBySlug(
  slug: string
): Promise<ServiceContent | null> {
  try {
    const row = await prisma.service.findFirst({
      where: { slug, publishStatus: "PUBLISHED" },
    });
    if (row) return mapServiceRecord(row);
    return null;
  } catch {
    return getServiceFallback(slug);
  }
}

function getServiceFallback(slug: string): ServiceContent | null {
  return SERVICES.find((s) => s.slug === slug) || null;
}

export async function getPublishedCourses(): Promise<PublicCourse[]> {
  try {
    const rows = await prisma.academyCourse.findMany({
      where: { publishStatus: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map(mapCourse);
  } catch {
    return ACADEMY_COURSES.map((c) => ({
      slug: c.slug,
      title: c.title,
      summary: c.summary,
      description: c.description,
      status: c.status,
      sortOrder: c.sortOrder,
      audience: c.audience,
      outcomes: [...c.outcomes],
      futureFeatures: [...c.futureFeatures],
      seoTitle: c.seoTitle,
      seoDescription: c.seoDescription,
    }));
  }
}

export async function getPublishedCourseBySlug(
  slug: string
): Promise<PublicCourse | null> {
  try {
    const row = await prisma.academyCourse.findFirst({
      where: { slug, publishStatus: "PUBLISHED" },
    });
    if (row) return mapCourse(row);
    return null;
  } catch {
    const fallback = ACADEMY_COURSES.find((c) => c.slug === slug);
    if (!fallback) return null;
    return {
      slug: fallback.slug,
      title: fallback.title,
      summary: fallback.summary,
      description: fallback.description,
      status: fallback.status,
      sortOrder: fallback.sortOrder,
      audience: fallback.audience,
      outcomes: [...fallback.outcomes],
      futureFeatures: [...fallback.futureFeatures],
      seoTitle: fallback.seoTitle,
      seoDescription: fallback.seoDescription,
    };
  }
}

export async function getPublishedToolkit(): Promise<PublicToolkit> {
  try {
    const row = await prisma.toolkitProduct.findFirst({
      where: { publishStatus: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
    });
    if (row) return mapToolkit(row);
  } catch {
    // fall through
  }
  return {
    slug: TOOLKIT_PRODUCT.slug,
    title: TOOLKIT_PRODUCT.title,
    subtitle: TOOLKIT_PRODUCT.subtitle,
    description: TOOLKIT_PRODUCT.description,
    status: TOOLKIT_PRODUCT.status,
    contents: [...TOOLKIT_PRODUCT.contents],
    licenceSummary: TOOLKIT_PRODUCT.licenceSummary,
    disclaimer: TOOLKIT_PRODUCT.disclaimer,
    ctaLabel: toolkitCtaLabel(TOOLKIT_PRODUCT.status),
    seoTitle: TOOLKIT_PRODUCT.seoTitle,
    seoDescription: TOOLKIT_PRODUCT.seoDescription,
    publishStatus: "PUBLISHED",
  };
}

export async function getPublishedToolkitBySlug(
  slug: string
): Promise<PublicToolkit | null> {
  try {
    const row = await prisma.toolkitProduct.findFirst({
      where: { slug, publishStatus: "PUBLISHED" },
    });
    if (row) return mapToolkit(row);
    return null;
  } catch {
    if (slug === TOOLKIT_PRODUCT.slug) return getPublishedToolkit();
    return null;
  }
}

export async function getGrcPlatformContent(): Promise<PublicGrcPlatform> {
  try {
    const row = await prisma.grcPlatformContent.findFirst({
      orderBy: { createdAt: "asc" },
    });
    if (row) return mapGrc(row);
  } catch {
    // fall through
  }
  return {
    title: GRC_PLATFORM.title,
    status: GRC_PLATFORM.status,
    summary: GRC_PLATFORM.summary,
    description: GRC_PLATFORM.description,
    features: [...GRC_PLATFORM.features],
    seoTitle: GRC_PLATFORM.seoTitle,
    seoDescription: GRC_PLATFORM.seoDescription,
  };
}

export async function getVisibleHomepageSections(): Promise<HomepageSection[]> {
  try {
    return await prisma.homepageSection.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getHomepageSectionMap(): Promise<
  Record<string, HomepageSection>
> {
  const sections = await getVisibleHomepageSections();
  return Object.fromEntries(sections.map((s) => [s.key, s]));
}

export async function getLatestPublishedInsights(limit = 3): Promise<Insight[]> {
  try {
    return await prisma.insight.findMany({
      where: { publishStatus: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getPublishedFaqs(category?: string): Promise<FAQ[]> {
  try {
    return await prisma.fAQ.findMany({
      where: {
        publishStatus: "PUBLISHED",
        ...(category ? { category } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return [];
  }
}

export type PublicSocialLinks = {
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  x?: string;
};

export type PublicContactSettings = {
  email?: string;
  telephone?: string;
};

export async function getPublicSiteSettings(): Promise<{
  socialLinks: PublicSocialLinks;
  contactInfo: PublicContactSettings;
}> {
  const defaults = {
    socialLinks: {} as PublicSocialLinks,
    contactInfo: {
      email: COMPANY.email,
      telephone: COMPANY.telephone,
    } as PublicContactSettings,
  };

  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: ["socialLinks", "contactInfo"] } },
    });
    for (const row of rows) {
      if (row.key === "socialLinks" && row.value && typeof row.value === "object") {
        const value = row.value as Record<string, unknown>;
        const cleaned: PublicSocialLinks = {};
        for (const key of ["linkedin", "youtube", "twitter", "x"] as const) {
          const raw = value[key];
          if (typeof raw === "string" && raw.trim()) cleaned[key] = raw.trim();
        }
        defaults.socialLinks = cleaned;
      }
      if (row.key === "contactInfo" && row.value && typeof row.value === "object") {
        const value = row.value as Record<string, unknown>;
        defaults.contactInfo = {
          email:
            typeof value.email === "string" && value.email.trim()
              ? value.email.trim()
              : COMPANY.email,
          telephone:
            typeof value.telephone === "string" && value.telephone.trim()
              ? value.telephone.trim()
              : COMPANY.telephone,
        };
      }
    }
  } catch {
    // keep defaults
  }

  return defaults;
}

export function sectionContentObject(
  section: HomepageSection | undefined
): Record<string, unknown> {
  if (!section?.content || typeof section.content !== "object" || Array.isArray(section.content)) {
    return {};
  }
  return section.content as Record<string, unknown>;
}
