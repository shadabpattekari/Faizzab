import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { COMPANY } from "@/lib/company";

type SeoOverrides = {
  title?: string | null;
  description?: string | null;
  path: string;
  noindex?: boolean;
};

export async function getSeoEntry(path: string) {
  try {
    return await prisma.seoEntry.findUnique({ where: { path } });
  } catch {
    return null;
  }
}

export async function buildPageMetadata(options: SeoOverrides): Promise<Metadata> {
  const entry = await getSeoEntry(options.path);
  const title = entry?.title || options.title || COMPANY.brand;
  const description =
    entry?.description ||
    options.description ||
    "Practical GRC consulting and implementation support from FaizZab.";
  const ogTitle = entry?.ogTitle || title;
  const ogDescription = entry?.ogDescription || description;
  const noindex = entry?.noindex ?? options.noindex ?? false;

  return {
    title,
    description,
    alternates: { canonical: options.path },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${COMPANY.url}${options.path === "/" ? "" : options.path}`,
      siteName: COMPANY.brand,
      type: "website",
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
