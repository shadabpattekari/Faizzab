import { describe, expect, it } from "vitest";
import { toolkitCtaLabel } from "@/lib/content/loaders";

describe("toolkit CTA wording", () => {
  it("uses Join Toolkit Launch List when coming soon", () => {
    expect(toolkitCtaLabel("COMING_SOON")).toBe("Join Toolkit Launch List");
  });

  it("uses Request Toolkit Purchase when available", () => {
    expect(toolkitCtaLabel("AVAILABLE_NOW")).toBe("Request Toolkit Purchase");
  });
});
