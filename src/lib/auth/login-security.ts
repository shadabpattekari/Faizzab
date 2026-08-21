export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_MS = 15 * 60 * 1000;

/** Public-facing message for every unsuccessful authentication outcome. */
export const GENERIC_LOGIN_FAILURE_MESSAGE =
  "Unable to sign in with the provided credentials.";

export type LoginAuditReason =
  | "INVALID_CREDENTIALS"
  | "ACCOUNT_LOCKED"
  | "ACCOUNT_INACTIVE"
  | "RATE_LIMITED"
  | "LOGIN_SUCCESS"
  | "INVALID_REQUEST";

export function authFailureJson() {
  return {
    body: { ok: false as const, error: GENERIC_LOGIN_FAILURE_MESSAGE },
    status: 401 as const,
  };
}

export function isAccountCurrentlyLocked(lockedUntil: Date | null | undefined, now = new Date()) {
  return Boolean(lockedUntil && lockedUntil > now);
}

export function nextFailedLoginState(currentFailedCount: number, now = new Date()) {
  const nextCount = currentFailedCount + 1;
  const shouldLock = nextCount >= MAX_FAILED_LOGIN_ATTEMPTS;
  return {
    nextCount,
    shouldLock,
    failedLoginCount: shouldLock ? 0 : nextCount,
    lockedUntil: shouldLock ? new Date(now.getTime() + LOGIN_LOCKOUT_MS) : null,
  };
}
