"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";
const labelClass = "block text-sm font-semibold text-slate-700";

async function request(
  url: string,
  method: "POST" | "PUT" | "PATCH",
  body: Record<string, string>
) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => null)) as
    | { ok?: boolean; error?: string }
    | null;
  if (!response.ok || !result?.ok) throw new Error(result?.error || "Request failed.");
}

export function LoginForm({ nextPath = "/admin" }: { nextPath?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      await request("/api/auth/login", "POST", {
        email: String(data.get("email") || ""),
        password: String(data.get("password") || ""),
      });
      router.replace(nextPath.startsWith("/admin") ? nextPath : "/admin");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className={labelClass}>
        Email address
        <input className={inputClass} name="email" type="email" autoComplete="email" required />
      </label>
      <label className={labelClass}>
        Password
        <input
          className={inputClass}
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm">
        <Link className="font-semibold text-teal-700 hover:underline" href="/admin/forgot-password">
          Forgot your password?
        </Link>
      </p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const data = new FormData(event.currentTarget);
    try {
      await request("/api/auth/password", "PUT", {
        email: String(data.get("email") || ""),
      });
      setMessage("If the account exists, a reset link has been sent.");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Unable to process request.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className={labelClass}>
        Email address
        <input className={inputClass} name="email" type="email" autoComplete="email" required />
      </label>
      {message ? <p role="status" className="text-sm text-slate-700">{message}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
      <Link className="block text-center text-sm font-semibold text-teal-700 hover:underline" href="/admin/login">
        Back to sign in
      </Link>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      await request("/api/auth/password", "PATCH", {
        token,
        newPassword: String(data.get("newPassword") || ""),
        confirmPassword: String(data.get("confirmPassword") || ""),
      });
      router.replace("/admin/login?reset=success");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to reset password.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <PasswordFields />
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending || !token}>
        {pending ? "Updating…" : "Set new password"}
      </Button>
    </form>
  );
}

export function ChangePasswordForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      await request("/api/auth/password", "POST", {
        currentPassword: String(data.get("currentPassword") || ""),
        newPassword: String(data.get("newPassword") || ""),
        confirmPassword: String(data.get("confirmPassword") || ""),
      });
      router.replace("/admin/login?password=changed");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to change password.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className={labelClass}>
        Current password
        <input
          className={inputClass}
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      <PasswordFields />
      <p className="text-xs text-slate-500">
        Use at least 12 characters with uppercase, lowercase, number, and special character.
      </p>
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Updating…" : "Change password"}
      </Button>
    </form>
  );
}

function PasswordFields() {
  return (
    <>
      <label className={labelClass}>
        New password
        <input
          className={inputClass}
          name="newPassword"
          type="password"
          minLength={12}
          autoComplete="new-password"
          required
        />
      </label>
      <label className={labelClass}>
        Confirm new password
        <input
          className={inputClass}
          name="confirmPassword"
          type="password"
          minLength={12}
          autoComplete="new-password"
          required
        />
      </label>
    </>
  );
}
