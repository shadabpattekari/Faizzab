// Website QA (run by GitHub on every change). Not part of the site build: GitHub installs
// @playwright/test and @axe-core/playwright only for this run.
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "**/*.qa.ts",
  timeout: 60_000,
  retries: 1,
  workers: 2,
  reporter: [["list"]],
  use: {
    baseURL: process.env.QA_BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } }],
});
