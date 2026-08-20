"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type Field =
  | {
      name: string;
      label: string;
      type?: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
      required?: boolean;
      options?: { value: string; label: string }[];
      placeholder?: string;
      rows?: number;
    };

export function LeadForm({
  endpoint,
  fields,
  submitLabel,
  successMessage,
  footer,
}: {
  endpoint: string;
  fields: Field[];
  submitLabel: string;
  successMessage: string;
  footer?: ReactNode;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = {};

    for (const field of fields) {
      if (field.type === "checkbox") {
        payload[field.name] = formData.get(field.name) === "on";
      } else {
        payload[field.name] = String(formData.get(field.name) ?? "");
      }
    }
    // honeypot
    payload.website = String(formData.get("website") ?? "");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setError(data.error || "Something went wrong. Please try again.");
        setPending(false);
        return;
      }

      setSuccess(true);
      form.reset();
    } catch {
      setError("Unable to submit right now. Please try again shortly.");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-lg border border-teal-200 bg-teal-50 p-6 text-teal-950"
        role="status"
        aria-live="polite"
      >
        <p className="font-semibold">{successMessage}</p>
        <p className="mt-2 text-sm text-teal-900/80">
          We will review your submission and respond using the contact details provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input tabIndex={-1} autoComplete="off" type="text" id="website" name="website" />
      </div>

      {fields.map((field) => {
        const id = `field-${field.name}`;
        const err = fieldErrors[field.name];
        const common =
          "mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30";

        return (
          <div key={field.name}>
            {field.type === "checkbox" ? (
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  id={id}
                  name={field.name}
                  type="checkbox"
                  required={field.required}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                  aria-invalid={Boolean(err)}
                  aria-describedby={err ? `${id}-error` : undefined}
                />
                <span>{field.label}</span>
              </label>
            ) : (
              <>
                <label htmlFor={id} className="block text-sm font-medium text-slate-800">
                  {field.label}
                  {field.required ? <span className="text-teal-700"> *</span> : null}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={id}
                    name={field.name}
                    required={field.required}
                    rows={field.rows ?? 4}
                    placeholder={field.placeholder}
                    className={common}
                    aria-invalid={Boolean(err)}
                    aria-describedby={err ? `${id}-error` : undefined}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={id}
                    name={field.name}
                    required={field.required}
                    className={common}
                    defaultValue=""
                    aria-invalid={Boolean(err)}
                    aria-describedby={err ? `${id}-error` : undefined}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {field.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={id}
                    name={field.name}
                    type={field.type || "text"}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={common}
                    aria-invalid={Boolean(err)}
                    aria-describedby={err ? `${id}-error` : undefined}
                  />
                )}
              </>
            )}
            {err ? (
              <p id={`${id}-error`} className="mt-1 text-sm text-red-700" role="alert">
                {err}
              </p>
            ) : null}
          </div>
        );
      })}

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting…" : submitLabel}
      </Button>

      {footer}
    </form>
  );
}
