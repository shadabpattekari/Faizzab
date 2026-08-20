import { cn } from "@/lib/utils";

type StatusKey = "AVAILABLE_NOW" | "COMING_SOON" | "IN_DEVELOPMENT";

const LABELS: Record<StatusKey, string> = {
  AVAILABLE_NOW: "AVAILABLE NOW",
  COMING_SOON: "COMING SOON",
  IN_DEVELOPMENT: "IN DEVELOPMENT",
};

const STYLES: Record<StatusKey, string> = {
  AVAILABLE_NOW: "bg-teal-50 text-teal-800 ring-1 ring-teal-200",
  COMING_SOON: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  IN_DEVELOPMENT: "bg-navy-50 text-navy-800 ring-1 ring-navy-200",
};

export function StatusBadge({
  status,
  className,
}: {
  status: StatusKey | string;
  className?: string;
}) {
  const key = (status in LABELS ? status : "COMING_SOON") as StatusKey;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide",
        STYLES[key],
        className
      )}
    >
      {LABELS[key]}
    </span>
  );
}
