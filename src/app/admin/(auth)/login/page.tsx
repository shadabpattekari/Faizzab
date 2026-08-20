import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/AuthForms";
import { getSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Sign in" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; reset?: string; password?: string }>;
}) {
  const user = await getSessionUser();
  if (user) redirect("/admin");
  const query = await searchParams;
  const nextPath = query.next?.startsWith("/admin") ? query.next : "/admin";
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-navy-950">Welcome back</h1>
      <p className="mb-7 mt-2 text-sm text-slate-600">Sign in to manage FaizZab content.</p>
      {query.reset === "success" || query.password === "changed" ? (
        <p className="mb-5 rounded-lg bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
          Your password has been updated. Please sign in again.
        </p>
      ) : null}
      <LoginForm nextPath={nextPath} />
    </>
  );
}
