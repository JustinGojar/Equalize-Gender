import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { SectionTitle } from "@/components/SectionTitle";
import { SourceTag } from "@/components/SourceTag";
import { ChartsPanel } from "@/components/charts/ChartsPanel";
import {
  headlineStats,
  indicatorNotice,
  indicators,
  ipvTrend,
  sourceById,
} from "@/data/genderData";

export const Route = createFileRoute("/statistics")({
  head: () => ({
    meta: [
      { title: "The Issue in Numbers — EQUALIZE" },
      {
        name: "description",
        content:
          "Official Philippine Statistics Authority figures on intimate partner violence and gender equality indicators, with sources and reference years.",
      },
      { property: "og:title", content: "The Issue in Numbers — EQUALIZE" },
      {
        property: "og:description",
        content: "Interactive dashboard of official PSA gender statistics, 2017 vs 2022.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatsPage,
});

function StatsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Statistics"
        title="The Issue in Numbers"
        lead="Official figures with their exact definitions, populations and reference years. Primary source: the Philippine Statistics Authority."
      />

      <section className="section-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {headlineStats.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className="h-full">
              <StatCard stat={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20">
        <Reveal>
          <GlassCard className="p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              Comparison
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <p className="font-display text-5xl font-semibold text-foreground/70">14.7%</p>
                <p className="text-sm text-muted-foreground">2017</p>
              </div>
              <ArrowRight className="size-8 text-coral" aria-label="to" />
              <div>
                <p className="font-display text-5xl font-semibold text-gradient">11.9%</p>
                <p className="text-sm text-muted-foreground">2022</p>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {ipvTrend.note}
            </p>
            <div className="mt-4">
              <SourceTag label={ipvTrend.sourceLabel} sourceId={ipvTrend.sourceId} />
            </div>
          </GlassCard>
        </Reveal>

        <div className="mt-6">
          <ChartsPanel />
        </div>

        <p className="mt-5 flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          These figures describe reported experiences in national surveys. They do not by themselves
          explain causes or prove that a particular intervention worked.
        </p>
      </section>

      <section className="section-shell mt-24">
        <SectionTitle
          eyebrow="Dashboard"
          title="Gender Equality Indicators"
          lead="Key areas tracked by Philippine agencies. Each card shows its own reference year."
        />
        <p className="glass mt-6 rounded-2xl px-5 py-4 text-sm text-foreground">
          <strong>Notice:</strong> {indicatorNotice}
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {indicators.map((ind, i) => {
            const src = sourceById(ind.sourceId);
            return (
              <Reveal key={ind.id} delay={(i % 3) * 0.06} className="h-full">
                <GlassCard interactive className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-lavender">
                      {ind.area}
                    </h3>
                    <span className="rounded-full border border-glass-border bg-glass px-2.5 py-0.5 text-[0.7rem] text-muted-foreground">
                      {ind.year}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-3xl font-semibold text-foreground">
                    {ind.value}
                  </p>
                  <p className="mt-2 text-sm text-foreground/85">{ind.indicator}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ind.note}</p>
                  <p className="mt-4 text-[0.7rem] text-muted-foreground">
                    Source: {ind.sourceLabel}
                  </p>
                  {src ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-glass-border bg-glass-strong px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-cyan/50"
                    >
                      View source <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                  ) : null}
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
