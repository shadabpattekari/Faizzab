import { describe, expect, it } from "vitest";
import { validatePasswordStrength } from "@/lib/auth/session";

describe("bootstrap password strength rules", () => {
  it("rejects weak bootstrap passwords with the shared validator", () => {
    expect(validatePasswordStrength("short")).toBeTruthy();
    expect(validatePasswordStrength("alllowercase1!")).toBeTruthy();
    expect(validatePasswordStrength("ALLUPPERCASE1!")).toBeTruthy();
    expect(validatePasswordStrength("NoNumber!!!!")).toBeTruthy();
    expect(validatePasswordStrength("NoSpecial1234")).toBeTruthy();
  });

  it("accepts strong passwords used by bootstrap and password-change flows", () => {
    expect(validatePasswordStrength("ChangeMeNow!2026")).toBeNull();
  });
});
