import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/admin/AuthForms";

export const metadata: Metadata = { title: "Set new password" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-navy-950">Set a new password</h1>
      <p className="mb-7 mt-2 text-sm text-slate-600">
        Use at least 12 characters with uppercase, lowercase, number, and special character.
      </p>
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <div className="space-y-5">
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            This reset link is incomplete.
          </p>
          <Link className="font-semibold text-teal-700 hover:underline" href="/admin/forgot-password">
            Request a new link
          </Link>
        </div>
      )}
    </>
  );
}
