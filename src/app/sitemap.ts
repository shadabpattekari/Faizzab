import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";
import { SERVICES } from "@/lib/content/services";
import { ACADEMY_COURSES, TOOLKIT_PRODUCT } from "@/lib/content/products";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${COMPANY.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${COMPANY.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: service.isFeatured ? 0.9 : 0.7,
  }));

  const academyEntries: MetadataRoute.Sitemap = ACADEMY_COURSES.map((course) => ({
    url: `${COMPANY.url}/academy/${course.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...academyEntries,
    {
      url: `${COMPANY.url}/toolkits/${TOOLKIT_PRODUCT.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
