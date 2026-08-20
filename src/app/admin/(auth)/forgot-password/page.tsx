import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/admin/AuthForms";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-navy-950">Reset your password</h1>
      <p className="mb-7 mt-2 text-sm text-slate-600">
        Enter your admin email and we will send a time-limited reset link.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
