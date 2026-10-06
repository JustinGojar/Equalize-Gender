import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { sources } from "@/data/genderData";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "References & Sources — EQUALIZE" },
      {
        name: "description",
        content:
          "Every statistic, law and claim on EQUALIZE, linked to the PSA, PCW, Official Gazette, UN Women and other official sources.",
      },
      { property: "og:title", content: "References & Sources — EQUALIZE" },
      {
        property: "og:description",
        content: "Full list of official sources used across the EQUALIZE platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sources"
        title="References & Sources"
        lead="Every statistic, law and factual claim on this site links back to one of these official or institutional sources."
      />
      <section className="section-shell">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sources.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.05} className="h-full">
              <li className="h-full">
                <GlassCard interactive className="flex h-full flex-col">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan">
                    {s.organization}
                  </p>
                  <h2 className="mt-3 text-base font-semibold leading-snug text-foreground">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-xs text-lavender">{s.year}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm font-semibold text-coral"
                  >
                    Visit Source
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </GlassCard>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
