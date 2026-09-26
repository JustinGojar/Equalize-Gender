import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-display font-semibold text-foreground",
          Heading === "h1"
            ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            : "text-2xl leading-tight sm:text-3xl lg:text-4xl",
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>
      ) : null}
    </div>
  );
}
