import { describe, expect, it } from "vitest";
import {
  GENERIC_LOGIN_FAILURE_MESSAGE,
  MAX_FAILED_LOGIN_ATTEMPTS,
  authFailureJson,
  isAccountCurrentlyLocked,
  nextFailedLoginState,
} from "@/lib/auth/login-security";

describe("login public failure response", () => {
  it("always returns the same generic 401 payload", () => {
    const failure = authFailureJson();
    expect(failure.status).toBe(401);
    expect(failure.body).toEqual({
      ok: false,
      error: GENERIC_LOGIN_FAILURE_MESSAGE,
    });
    expect(failure.body.error).toBe("Unable to sign in with the provided credentials.");
  });
});

describe("account lockout state machine", () => {
  it("increments failed count until threshold", () => {
    const first = nextFailedLoginState(0);
    expect(first.nextCount).toBe(1);
    expect(first.shouldLock).toBe(false);
    expect(first.failedLoginCount).toBe(1);
    expect(first.lockedUntil).toBeNull();

    const fourth = nextFailedLoginState(3);
    expect(fourth.nextCount).toBe(4);
    expect(fourth.shouldLock).toBe(false);
  });

  it("locks after the configured number of failures", () => {
    const now = new Date("2026-08-21T04:00:00.000Z");
    const locked = nextFailedLoginState(MAX_FAILED_LOGIN_ATTEMPTS - 1, now);
    expect(locked.nextCount).toBe(MAX_FAILED_LOGIN_ATTEMPTS);
    expect(locked.shouldLock).toBe(true);
    expect(locked.failedLoginCount).toBe(0);
    expect(locked.lockedUntil?.toISOString()).toBe("2026-08-21T04:15:00.000Z");
  });

  it("detects active lockout windows", () => {
    const now = new Date("2026-08-21T04:10:00.000Z");
    expect(isAccountCurrentlyLocked(new Date("2026-08-21T04:15:00.000Z"), now)).toBe(true);
    expect(isAccountCurrentlyLocked(new Date("2026-08-21T04:05:00.000Z"), now)).toBe(false);
    expect(isAccountCurrentlyLocked(null, now)).toBe(false);
  });
});
