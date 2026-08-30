import { describe, expect, it } from "vitest";
import { safeJsonLd } from "@/lib/seo/safe-json-ld";

describe("safeJsonLd", () => {
  it("escapes script-breakout payloads from Admin-controlled strings", () => {
    const payload = "</script><script>alert(1)</script>";
    const serialized = safeJsonLd({
      "@type": "Article",
      headline: payload,
      description: payload,
    });

    expect(serialized).toContain("\\u003c/script\\u003e");
    expect(serialized).toContain("\\u003cscript\\u003e");
    expect(serialized).not.toMatch(/<\/script>/i);
    expect(serialized).not.toContain("<script>");
    expect(serialized).not.toContain("</script>");
  });

  it("escapes angle brackets and ampersands", () => {
    const serialized = safeJsonLd({ value: "A & B < C > D" });
    expect(serialized).toContain("\\u0026");
    expect(serialized).toContain("\\u003c");
    expect(serialized).toContain("\\u003e");
    expect(serialized).not.toContain("<");
    expect(serialized).not.toContain(">");
    expect(serialized).not.toContain("&");
  });

  it("remains valid JSON after Unicode escaping", () => {
    const data = {
      title: "ISO <27001> & GRC",
      body: "</script><script>alert(1)</script>",
    };
    const parsed = JSON.parse(safeJsonLd(data)) as typeof data;
    expect(parsed.title).toBe(data.title);
    expect(parsed.body).toBe(data.body);
  });
});
