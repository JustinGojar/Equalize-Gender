import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SectionTitle } from "@/components/SectionTitle";
import { actions, commitments, resources, sourceById, type Resource } from "@/data/genderData";

export const Route = createFileRoute("/take-action")({
  head: () => ({
    meta: [
      { title: "Take Action — What Can You Do? | EQUALIZE" },
      {
        name: "description",
        content:
          "Small actions with real impact, a personal equality commitment, and official resources to learn, know your rights and get help.",
      },
      { property: "og:title", content: "What Can You Do? — EQUALIZE" },
      {
        property: "og:description",
        content: "Make your equality commitment and find trusted Philippine resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TakeActionPage,
});

const categories: Resource["category"][] = [
  "Learn",
  "Know Your Rights",
  "Get Help",
  "Promote Inclusion",
];

function Commitment() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (c: string) =>
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassCard>
        <fieldset>
          <legend className="text-sm font-semibold text-foreground">
            Choose your commitments
          </legend>
          <ul className="mt-5 space-y-3">
            {commitments.map((c) => {
              const on = picked.includes(c);
              return (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-glass-border bg-glass p-4 transition-colors hover:bg-glass-strong has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => toggle(c)}
                    />
                    <motion.span
                      animate={{ scale: on ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`grid size-6 shrink-0 place-items-center rounded-lg border ${
                        on ? "border-transparent bg-gradient-cta" : "border-glass-border"
                      }`}
                      aria-hidden="true"
                    >
                      {on ? <Check className="size-4 text-primary-foreground" /> : null}
                    </motion.span>
                    <span className="text-sm text-foreground">{c}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <p className="mt-4 text-xs text-muted-foreground">
          Nothing is saved or sent anywhere. No personal information is collected.
        </p>
      </GlassCard>

      <AnimatePresence mode="wait">
        {picked.length > 0 ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8"
            aria-live="polite"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 size-48 rounded-full bg-violet/50 blur-3xl"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              My Equality Commitment
            </p>
            <ul className="relative mt-5 space-y-3">
              {picked.map((c) => (
                <motion.li
                  key={c}
                  layout
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3 font-display text-lg text-foreground"
                >
                  <span className="text-coral" aria-hidden="true">
                    ✦
                  </span>
                  {c}
                </motion.li>
              ))}
            </ul>
            <p className="relative mt-6 text-sm text-muted-foreground">
              {picked.length} of {commitments.length} commitments · Equality starts with awareness.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid place-items-center rounded-3xl border border-dashed border-glass-border p-8 text-center text-sm text-muted-foreground"
          >
            Select at least one commitment to see your summary card.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResourceFinder() {
  const [cat, setCat] = useState<Resource["category"]>("Learn");
  const list = resources.filter((r) => r.category === cat);
  return (
    <>
      <div role="tablist" aria-label="Resource categories" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              cat === c
                ? "border-transparent bg-gradient-cta text-primary-foreground"
                : "border-glass-border bg-glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          role="tabpanel"
          className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((r) => {
            const src = sourceById(r.sourceId);
            return (
              <GlassCard key={r.id} interactive className="flex h-full flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-lavender">
                  {r.organization}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
                {src ? (
                  <>
                    <p className="mt-4 text-[0.7rem] text-muted-foreground">
                      Source: {src.organization}, {src.year}
                    </p>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-semibold text-coral"
                    >
                      Visit resource <ExternalLink className="size-3.5" />
                    </a>
                  </>
                ) : null}
              </GlassCard>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function TakeActionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Take Action"
        title="What Can You Do?"
        lead="Everyday choices shape what a community accepts. Start with one."
      />
      <section className="section-shell">
        <SectionTitle as="h2" title="Small Actions. Real Impact." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {actions.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05} className="h-full">
              <GlassCard interactive className="h-full p-5">
                <Icon name={a.icon} className="size-6 text-cyan" />
                <h3 className="mt-4 text-base font-semibold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24">
        <SectionTitle eyebrow="Pledge" title="Make your commitment" />
        <div className="mt-8">
          <Commitment />
        </div>
      </section>

      <section className="section-shell mt-24">
        <SectionTitle
          eyebrow="Resource finder"
          title="Trusted places to go next"
          lead="Official and institutional resources only."
        />
        <div className="mt-8">
          <ResourceFinder />
        </div>
      </section>
    </>
  );
}
