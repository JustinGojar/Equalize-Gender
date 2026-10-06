import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, BarChart3, Scale, ShieldCheck, Sparkles, Users } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { SourceTag } from "@/components/SourceTag";
import { MythOrFact } from "@/components/MythOrFact";
import { SectionTitle } from "@/components/SectionTitle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EQUALIZE — Gender Awareness and Inclusion Platform" },
      {
        name: "description",
        content:
          "Learn the facts on gender-based violence and harassment in the Philippines, know your rights, and help build a safer, more inclusive community.",
      },
      { property: "og:title", content: "EQUALIZE — Equality Starts With Awareness" },
      {
        property: "og:description",
        content:
          "An educational platform on gender-based violence, harassment, equality and inclusion, grounded in official Philippine data and law.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: ShieldCheck,
    title: "Awareness",
    body: "Understand gender-based violence, harassment, discrimination, and harmful stereotypes.",
    to: "/issue" as const,
  },
  {
    icon: Scale,
    title: "Equality",
    body: "Learn why equal opportunities, rights, and participation matter.",
    to: "/laws" as const,
  },
  {
    icon: Sparkles,
    title: "Empowerment",
    body: "Discover practical ways to promote respect, inclusion, and social responsibility.",
    to: "/take-action" as const,
  },
];

function HeroVisual() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -60]);
  const y2 = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 40]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]" aria-hidden="true">
      <div className="absolute left-[8%] top-[10%] size-56 rounded-full bg-violet/50 blur-3xl animate-float-slow" />
      <div className="absolute bottom-[8%] right-[6%] size-48 rounded-full bg-cyan/35 blur-3xl animate-float-slower" />
      <div className="absolute right-[24%] top-[30%] size-32 rounded-full bg-coral/35 blur-3xl animate-float-slow" />

      {/* network */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full text-lavender/40">
        {[
          [80, 120, 200, 200],
          [200, 200, 320, 110],
          [200, 200, 300, 310],
          [200, 200, 100, 300],
          [80, 120, 100, 300],
          [320, 110, 300, 310],
        ].map(([a, b, c, d], i) => (
          <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="currentColor" strokeWidth="1.2" />
        ))}
        {[
          [80, 120],
          [320, 110],
          [300, 310],
          [100, 300],
        ].map(([cx, cy], i) => (
          <g key={i} className="text-foreground/80">
            <circle cx={cx} cy={cy} r="20" fill="currentColor" opacity="0.12" />
            <circle cx={cx} cy={cy - 5} r="6" fill="currentColor" />
            <path
              d={`M${cx - 10} ${cy + 12} q10 -14 20 0`}
              fill="currentColor"
            />
          </g>
        ))}
      </svg>

      {/* central equality glass */}
      <div className="glass-strong absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2.5rem] sm:size-44">
        <div className="flex flex-col gap-3">
          <span className="block h-3 w-20 rounded-full bg-gradient-cta" />
          <span className="block h-3 w-20 rounded-full bg-gradient-cta" />
        </div>
      </div>

      <motion.div
        style={{ y: y1 }}
        className="glass absolute left-0 top-[4%] rounded-2xl px-4 py-3"
      >
        <p className="font-display text-2xl font-semibold text-gradient">11.9%</p>
        <p className="text-[0.65rem] text-muted-foreground">IPV, past 12 months · PSA 2022</p>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="glass absolute bottom-[4%] right-0 flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <ShieldCheck className="size-6 text-cyan" />
        <div>
          <p className="text-sm font-semibold text-foreground">Safe Spaces Act</p>
          <p className="text-[0.65rem] text-muted-foreground">RA 11313 · 2019</p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="glass absolute right-[2%] top-[12%] grid size-14 place-items-center rounded-2xl"
      >
        <Users className="size-6 text-lavender" />
      </motion.div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="section-shell grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div className="animate-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-1.5 text-xs font-medium text-lavender">
            <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
            Gender-based violence &amp; harassment awareness
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            Equality Starts <span className="text-gradient">With Awareness.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Learn the facts. Understand your rights. Challenge harmful stereotypes. Help create a
            safer and more inclusive community.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/issue"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-cta px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore the Issue
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/statistics"
              className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-glass-strong"
            >
              <BarChart3 className="size-4" />
              View Statistics
            </Link>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="section-shell" aria-labelledby="pillars">
        <h2 id="pillars" className="sr-only">
          What you will find here
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link to={p.to} className="block h-full rounded-3xl">
                <GlassCard interactive className="h-full">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-cta">
                    <p.icon className="size-5 text-primary-foreground" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionTitle
            eyebrow="Test what you know"
            title="Separate myths from facts."
            lead="Seven quick statements about gender equality, harassment and Philippine law. Each answer comes with an explanation and its source."
          />
          <div className="mt-6">
            <SourceTag label="PSA, PCW & Official Gazette" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <MythOrFact />
        </Reveal>
      </section>
    </>
  );
}
