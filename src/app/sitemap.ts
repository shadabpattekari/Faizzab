import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";
import { prisma } from "@/lib/db/prisma";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/industries",
  "/academy",
  "/grc-platform",
  "/toolkits",
  "/insights",
  "/contact",
  "/corporate-information",
  "/privacy-policy",
  "/terms-of-use",
  "/disclaimer",
  "/cookie-policy",
];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${COMPANY.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  let serviceEntries: MetadataRoute.Sitemap = [];
  let academyEntries: MetadataRoute.Sitemap = [];
  let toolkitEntries: MetadataRoute.Sitemap = [];
  let insightEntries: MetadataRoute.Sitemap = [];

  try {
    const [services, courses, toolkits, insights] = await Promise.all([
      prisma.service.findMany({
        where: { publishStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true, isFeatured: true },
      }),
      prisma.academyCourse.findMany({
        where: { publishStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.toolkitProduct.findMany({
        where: { publishStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.insight.findMany({
        where: { publishStatus: "PUBLISHED" },
        select: { slug: true, updatedAt: true, publishedAt: true },
      }),
    ]);

    serviceEntries = services.map((service) => ({
      url: `${COMPANY.url}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly",
      priority: service.isFeatured ? 0.9 : 0.7,
    }));

    academyEntries = courses.map((course) => ({
      url: `${COMPANY.url}/academy/${course.slug}`,
      lastModified: course.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    toolkitEntries = toolkits.map((toolkit) => ({
      url: `${COMPANY.url}/toolkits/${toolkit.slug}`,
      lastModified: toolkit.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    insightEntries = insights.map((insight) => ({
      url: `${COMPANY.url}/insights/${insight.slug}`,
      lastModified: insight.publishedAt || insight.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // Database unavailable during build/runtime: keep static entries only.
  }

  return [
    ...staticEntries,
    ...serviceEntries,
    ...academyEntries,
    ...toolkitEntries,
    ...insightEntries,
  ];
}
