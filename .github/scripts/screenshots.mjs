// Takes full-page screenshots of the given paths at four widths. Used only by CI for visual review.
// Usage: node screenshots.mjs <baseUrl> <outDir> <path> [path...]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [baseUrl, outDir, ...paths] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const widths = [1440, 1280, 768, 375];
const browser = await chromium.launch();
for (const path of paths) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(new URL(path, baseUrl).toString(), { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const name = `${path === "/" ? "home" : path.replace(/^\//, "").replace(/[/?=&]+/g, "-")}-${width}.jpg`;
    await page.screenshot({ path: `${outDir}/${name}`, fullPage: true, type: "jpeg", quality: 80 });
    console.log(`${name}${overflow > 1 ? `  WARNING: page scrolls sideways by ${overflow}px` : ""}`);
    await page.close();
  }
}
await browser.close();
