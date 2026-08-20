"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type ApiFormProps = {
  action: string;
  method?: "POST" | "PATCH" | "DELETE";
  children?: ReactNode;
  submitLabel?: string;
  successMessage?: string;
  redirectTo?: string;
  resetOnSuccess?: boolean;
  confirmMessage?: string;
  danger?: boolean;
  className?: string;
};

export function ApiForm({
  action,
  method = "PATCH",
  children,
  submitLabel = "Save changes",
  successMessage = "Changes saved.",
  redirectTo,
  resetOnSuccess = false,
  confirmMessage,
  danger = false,
  className = "space-y-5",
}: ApiFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (confirmMessage && !window.confirm(confirmMessage)) return;
    setPending(true);
    setMessage(null);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch(action, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!response.ok || !result?.ok) {
        setMessage({ type: "error", text: result?.error || "Request failed." });
        return;
      }
      if (resetOnSuccess) formRef.current?.reset();
      setMessage({ type: "success", text: successMessage });
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={submit} className={className}>
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant={danger ? "danger" : "primary"} disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        {message ? (
          <p
            role="status"
            className={`text-sm font-medium ${
              message.type === "success" ? "text-teal-700" : "text-red-700"
            }`}
          >
            {message.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}
