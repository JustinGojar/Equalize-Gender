import { ExternalLink } from "lucide-react";
import { sourceById } from "@/data/genderData";
import { cn } from "@/lib/utils";

export function SourceTag({
  label,
  sourceId,
  className,
}: {
  label: string;
  sourceId?: string;
  className?: string;
}) {
  const source = sourceId ? sourceById(sourceId) : undefined;
  const base =
    "inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-glass px-3 py-1 text-[0.7rem] font-medium tracking-wide text-muted-foreground";

  if (!source) {
    return <span className={cn(base, className)}>Source: {label}</span>;
  }

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(base, "transition-colors hover:border-cyan/50 hover:text-foreground", className)}
    >
      Source: {label}
      <ExternalLink className="size-3" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
