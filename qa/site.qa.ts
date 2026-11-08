import { expect, test } from "@playwright/test";
import { ALL_PAGES } from "./pages";

test("no broken internal links on any page", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of ALL_PAGES) {
    await page.goto(path);
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href") ?? ""),
    );
    for (const href of hrefs) {
      if (href.startsWith("/") && !href.startsWith("//")) {
        seen.add(href.split("#")[0] || "/");
      }
    }
  }
  const broken: string[] = [];
  for (const href of seen) {
    const response = await request.get(href, { maxRedirects: 5 });
    if (response.status() >= 400) broken.push(`${href} → ${response.status()}`);
  }
  expect(broken, `checked ${seen.size} internal links`).toEqual([]);
});

test("security headers are set", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBeTruthy();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("admin pages are hidden from search engines", async ({ request }) => {
  const response = await request.get("/admin/login", { maxRedirects: 0 });
  expect(response.headers()["x-robots-tag"] ?? "").toContain("noindex");
});

test("robots.txt and sitemap.xml are valid", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toMatch(/Sitemap:\s*https:\/\/faizzab\.com\/sitemap\.xml/i);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of ["/", "/services", "/academy", "/contact"]) {
    expect(xml).toContain(`https://faizzab.com${path === "/" ? "" : path}`);
  }
  expect(xml).not.toContain("/admin");
});

test("home page tells Google who the company is (structured data)", async ({ page }) => {
  await page.goto("/");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const joined = blocks.join("\n");
  expect(joined).toContain("FAIZZAB INTEGRITY PRIVATE LIMITED");
  expect(() => blocks.forEach((block) => JSON.parse(block))).not.toThrow();
});

test("home page: no empty Insights box, Academy shows Enrolling soon", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Insights will appear here when published")).toHaveCount(0);
  await expect(page.getByText("ENROLLING SOON").first()).toBeVisible();
  await expect(page.getByText("Standards we implement")).toBeVisible();
});
