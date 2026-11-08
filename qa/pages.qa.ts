import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ALL_PAGES, COMPANY_FACTS } from "./pages";

const PLACEHOLDER_TEXT = /lorem ipsum|\bTODO\b|\bTBD\b|undefined|\[object Object\]|NaN%|null null/i;

for (const path of ALL_PAGES) {
  test.describe(`page ${path}`, () => {
    test("loads, has a heading, title and description, no errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      const response = await page.goto(path, { waitUntil: "networkidle" });
      expect(response?.status(), "HTTP status").toBeLessThan(400);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/FaizZab/);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0, "meta description length").toBeGreaterThan(50);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, "canonical link").toMatch(/^https:\/\/faizzab\.com/);
      const text = await page.locator("main").innerText();
      expect(text, "placeholder text").not.toMatch(PLACEHOLDER_TEXT);
      expect(errors, "browser errors").toEqual([]);
    });

    test("footer shows the company details", async ({ page }) => {
      await page.goto(path);
      const footer = page.locator("footer");
      for (const fact of Object.values(COMPANY_FACTS)) {
        await expect(footer, fact).toContainText(fact);
      }
      // The director's name stays only in the Privacy Policy.
      if (!path.startsWith("/privacy-policy")) {
        await expect(page.locator("body")).not.toContainText("Nazneen Pattekari");
      }
    });

    test("no sideways scrolling on a phone", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 800 });
      await page.goto(path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(1);
    });

    test("accessibility: no serious or critical issues", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      const blocking = results.violations
        .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
        .map(
          (violation) =>
            `${violation.id} (${violation.impact}): ${violation.help} — ${violation.nodes
              .slice(0, 3)
              .map((node) => node.target.join(" "))
              .join(" | ")}`,
        );
      expect(blocking, "accessibility issues").toEqual([]);
    });
  });
}
