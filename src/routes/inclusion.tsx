import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SectionTitle } from "@/components/SectionTitle";
import { inclusionPillars, languageSwaps } from "@/data/genderData";

export const Route = createFileRoute("/inclusion")({
  head: () => ({
    meta: [
      { title: "Everyone Belongs — Inclusion | EQUALIZE" },
      {
        name: "description",
        content:
          "Respect, equal opportunity, inclusive schools and workplaces, and an interactive guide to inclusive language.",
      },
      { property: "og:title", content: "Everyone Belongs — EQUALIZE" },
      {
        property: "og:description",
        content: "Practical ideas for inclusion, plus before-and-after examples of inclusive language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InclusionPage,
});

function LanguageSwapper() {
  const [i, setI] = useState(0);
  const item = languageSwaps[i]!;
  const go = (d: number) => setI((v) => (v + d + languageSwaps.length) % languageSwaps.length);

  return (
    <GlassCard className="p-6 sm:p-9">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          Inclusive Language
        </p>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {i + 1} / {languageSwaps.length}
        </p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-coral/40 bg-glass p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-coral">✕ Instead of</p>
            <p className="mt-2 font-display text-lg text-foreground">{item.avoid}</p>
          </div>
          <div className="rounded-2xl border border-cyan/40 bg-glass p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan">✓ Use</p>
            <p className="mt-2 font-display text-lg text-foreground">{item.use}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:col-span-2">
            <strong className="text-foreground">Why: </strong>
            {item.why}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous example"
          className="grid size-11 place-items-center rounded-full border border-glass-border bg-glass hover:bg-glass-strong"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next example"
          className="grid size-11 place-items-center rounded-full border border-glass-border bg-glass hover:bg-glass-strong"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </GlassCard>
  );
}

function InclusionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Inclusion"
        title="Everyone Belongs"
        lead="Inclusion is what equality looks like in everyday life — in classrooms, workplaces, conversations and communities."
      />
      <section className="section-shell">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {inclusionPillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.05} className="h-full">
              <GlassCard interactive className="h-full">
                <Icon name={p.icon} className="size-6 text-lavender" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section-shell mt-24">
        <SectionTitle
          eyebrow="Try it"
          title="Words shape what feels normal."
          lead="Small changes in language remove assumptions about what people can do because of their gender."
        />
        <Reveal className="mt-8">
          <LanguageSwapper />
        </Reveal>
      </section>
    </>
  );
}
