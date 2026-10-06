import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SectionTitle } from "@/components/SectionTitle";
import { SourceTag } from "@/components/SourceTag";
import { MythOrFact } from "@/components/MythOrFact";
import { formsOfGbv, type Form } from "@/data/genderData";

export const Route = createFileRoute("/issue")({
  head: () => ({
    meta: [
      { title: "Understanding Gender-Based Violence — EQUALIZE" },
      {
        name: "description",
        content:
          "What gender-based violence is, the forms it takes, and how Philippine law defines them — explained in clear, age-appropriate language.",
      },
      { property: "og:title", content: "Understanding Gender-Based Violence — EQUALIZE" },
      {
        property: "og:description",
        content: "Seven forms of gender-based violence and harassment, with definitions and examples.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IssuePage,
});

function IssuePage() {
  const [active, setActive] = useState<Form | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="The Issue"
        title="Understanding Gender-Based Violence"
        lead="Clear definitions help people recognise harm, support others, and know where protection exists."
      />

      <section className="section-shell">
        <Reveal>
          <GlassCard className="p-7 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              What is Gender-Based Violence?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Gender-based violence refers to harmful acts or behaviours directed at people because
              of their sex or gender. It can happen at home, in relationships, at school, at work, in
              public spaces and online. Women and girls are disproportionately affected, but anyone
              can experience it.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <SourceTag label="UN Women, 2024" sourceId="unwomen-vaw" />
              <SourceTag label="Official Gazette, RA 9262" sourceId="og-9262" />
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section className="section-shell mt-20">
        <SectionTitle
          eyebrow="Forms"
          title="Forms of Gender-Based Violence"
          lead="Select a card to learn more. Examples are kept general and non-graphic."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {formsOfGbv.map((f, i) => (
            <Reveal key={f.id} delay={(i % 3) * 0.06}>
              <li className="h-full">
                <GlassCard interactive className="flex h-full flex-col">
                  <span className="grid size-11 place-items-center rounded-2xl border border-glass-border bg-glass-strong">
                    <Icon name={f.icon} className="size-5 text-lavender" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {i + 1}. {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.definition}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                    <span className="font-semibold text-cyan">Example: </span>
                    {f.example}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActive(f)}
                    className="mt-auto self-start pt-5 text-sm font-semibold text-coral underline-offset-4 hover:underline"
                  >
                    Learn more →
                  </button>
                </GlassCard>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section-shell mt-24">
        <Reveal>
          <MythOrFact />
        </Reveal>
      </section>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-background/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-dialog-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-lg rounded-3xl p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 id="form-dialog-title" className="text-xl font-semibold text-foreground">
                  {active.title}
                </h2>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="grid size-10 place-items-center rounded-xl border border-glass-border bg-glass"
                >
                  <X className="size-4" />
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.more}</p>
              <p className="mt-5 text-xs text-muted-foreground">
                If you or someone you know needs help, see the Get Help resources on the Take
                Action page.
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
