import { describe, expect, it } from "vitest";
import {
  AdminInputError,
  booleanValue,
  enumValue,
  integerValue,
  jsonValue,
  optionalString,
  requiredString,
  stringListValue,
} from "@/lib/admin/api";
import { PROTECTED_COMPANY_SETTING_KEYS } from "@/lib/admin/settings";

describe("admin API input parsing", () => {
  it("trims and validates required text", () => {
    expect(requiredString({ title: "  Practical GRC  " }, "title", 30)).toBe("Practical GRC");
    expect(() => requiredString({ title: "" }, "title")).toThrow(AdminInputError);
  });

  it("handles optional, boolean, integer, and enum fields", () => {
    expect(optionalString({ value: "" }, "value")).toBeNull();
    expect(booleanValue({ enabled: "true" }, "enabled")).toBe(true);
    expect(integerValue({ order: "12" }, "order")).toBe(12);
    expect(enumValue({ status: "DRAFT" }, "status", ["DRAFT", "PUBLISHED"])).toBe("DRAFT");
    expect(() => enumValue({ status: "DELETED" }, "status", ["DRAFT", "PUBLISHED"])).toThrow(
      AdminInputError
    );
  });

  it("parses JSON and newline lists", () => {
    expect(jsonValue({ value: '{"email":"info@faizzab.com"}' }, "value")).toEqual({
      email: "info@faizzab.com",
    });
    expect(stringListValue({ items: "Assess\n\nImplement\nEvidence" }, "items")).toEqual([
      "Assess",
      "Implement",
      "Evidence",
    ]);
    expect(() => jsonValue({ value: "{" }, "value")).toThrow(AdminInputError);
  });
});

describe("protected company identity", () => {
  it("contains every Super Admin-only key", () => {
    expect([...PROTECTED_COMPANY_SETTING_KEYS].sort()).toEqual(
      ["legalName", "cin", "registeredOffice", "grievancesContact"].sort()
    );
  });
});
