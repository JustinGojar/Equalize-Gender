import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ExternalLink, Gavel } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { laws, lawDisclaimer, sourceById, type Law } from "@/data/genderData";

export const Route = createFileRoute("/laws")({
  head: () => ({
    meta: [
      { title: "Know the Laws. Know Your Rights. — EQUALIZE" },
      {
        name: "description",
        content:
          "Philippine laws on gender equality and protection: the Magna Carta of Women, the Anti-VAWC Act, and the Safe Spaces Act, with official sources.",
      },
      { property: "og:title", content: "Know the Laws. Know Your Rights. — EQUALIZE" },
      {
        property: "og:description",
        content: "RA 9710, RA 9262, RA 11313 and RA 11596 explained, linked to the Official Gazette.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LawsPage,
});

function LawCard({ law }: { law: Law }) {
  const [open, setOpen] = useState(false);
  const src = sourceById(law.sourceId);
  return (
    <GlassCard interactive as="article" className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan">
          <Gavel className="size-4" aria-hidden="true" />
          {law.ra}
        </span>
        <span className="rounded-full border border-glass-border bg-glass px-3 py-1 text-xs text-muted-foreground">
          {law.year}
        </span>
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">{law.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{law.summary}</p>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-coral"
      >
        Why it matters
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <p className="mt-3 rounded-2xl border border-glass-border bg-glass p-4 text-sm leading-relaxed text-foreground/90 animate-rise">
          {law.why}
        </p>
      ) : null}

      {src ? (
        <a
          href={src.url}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Official source: {src.organization} <ExternalLink className="size-3" />
        </a>
      ) : null}
    </GlassCard>
  );
}

function LawsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Laws & Rights"
        title="Know the Laws. Know Your Rights."
        lead="Philippine laws that protect people from gender-based violence and discrimination."
      />
      <section className="section-shell">
        <div className="grid gap-5 md:grid-cols-2">
          {laws.map((l, i) => (
            <Reveal key={l.id} delay={(i % 2) * 0.08} className="h-full">
              <LawCard law={l} />
            </Reveal>
          ))}
        </div>
        <p className="glass mt-8 rounded-2xl px-5 py-4 text-sm text-muted-foreground">
          {lawDisclaimer}
        </p>
      </section>
    </>
  );
}
