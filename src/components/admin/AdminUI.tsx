import type { ReactNode } from "react";

export const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100";
export const labelClass = "block text-sm font-semibold text-slate-700";

export function formatAdminDate(value: Date | string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export function jsonToLines(value: unknown) {
  return Array.isArray(value) ? value.map(String).join("\n") : "";
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-navy-950">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-slate-600">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {children}
    </section>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  maxLength,
  placeholder,
  readOnly = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: "text" | "email" | "password" | "number" | "url";
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  readOnly?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      <input
        className={`${inputClass} ${readOnly ? "bg-slate-100 text-slate-500" : ""}`}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </label>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue,
  required = false,
  rows = 5,
  help,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  help?: string;
}) {
  return (
    <label className={labelClass}>
      {label}
      <textarea
        className={inputClass}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={rows}
      />
      {help ? <span className="mt-1 block text-xs font-normal text-slate-500">{help}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string | boolean | null;
  options: readonly (string | { value: string; label: string })[];
}) {
  return (
    <label className={labelClass}>
      {label}
      <select className={inputClass} name={name} defaultValue={String(defaultValue ?? "")}>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label =
            typeof option === "string" ? option.replaceAll("_", " ") : option.label;
          return (
            <option value={value} key={value}>
              {label}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export function JsonTextarea({
  label,
  name,
  value,
  rows = 8,
}: {
  label: string;
  name: string;
  value: unknown;
  rows?: number;
}) {
  return (
    <TextareaField
      label={label}
      name={name}
      defaultValue={JSON.stringify(value, null, 2)}
      rows={rows}
      help="Valid JSON is required."
    />
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-600">
      {children}
    </div>
  );
}
