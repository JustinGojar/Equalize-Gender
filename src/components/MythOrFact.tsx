import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SourceTag } from "./SourceTag";
import { quizItems } from "@/data/genderData";

const TIERS = [
  {
    min: 0.9,
    title: "Equality Champion",
    message: "Outstanding! You can clearly tell myths from facts. Share what you know.",
    Icon: Trophy,
  },
  {
    min: 0.7,
    title: "Gender Ally",
    message: "Great job! You know your rights and the laws that protect them.",
    Icon: Award,
  },
  {
    min: 0.4,
    title: "Rising Advocate",
    message: "Good effort! A few myths slipped through. Try again to beat your score.",
    Icon: Sparkles,
  },
  {
    min: 0,
    title: "Keep Learning",
    message: "Every expert started somewhere. Read the explanations and give it another go.",
    Icon: BookOpen,
  },
] as const;

const CONFETTI_COLORS = ["var(--violet)", "var(--coral)", "var(--cyan)", "var(--lavender)"];

function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

function useCountUp(target: number, duration = 1200) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduced]);

  return value;
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 520,
        y: -(120 + Math.random() * 220),
        rotate: (Math.random() - 0.5) * 720,
        delay: Math.random() * 0.25,
        size: 6 + Math.random() * 6,
        round: Math.random() > 0.5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    [],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-0">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-0"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            borderRadius: p.round ? "9999px" : "2px",
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 260],
            opacity: [1, 1, 0],
            rotate: p.rotate,
            scale: 1,
          }}
          transition={{ duration: 1.9, delay: p.delay, ease: "easeOut", times: [0, 0.4, 1] }}
        />
      ))}
    </div>
  );
}

function ScoreRing({ score, total }: { score: number; total: number }) {
  const reduced = useReducedMotion();
  const shown = useCountUp(score);
  const percent = useCountUp(Math.round((score / total) * 100));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const target = circumference * (1 - score / total);

  return (
    <div className="relative mx-auto size-44">
      <svg viewBox="0 0 128 128" className="size-full -rotate-90">
        <defs>
          <linearGradient id="score-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--coral)" />
          </linearGradient>
        </defs>
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="var(--glass-strong)"
          strokeWidth="10"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="url(#score-ring)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: reduced ? target : circumference }}
          animate={{ strokeDashoffset: target }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold text-foreground">{percent}%</span>
        <span className="text-sm text-muted-foreground">
          {shown} / {total} correct
        </span>
      </div>
    </div>
  );
}

function Result({
  score,
  bestStreak,
  onRestart,
}: {
  score: number;
  bestStreak: number;
  onRestart: () => void;
}) {
  const reduced = useReducedMotion();
  const total = quizItems.length;
  const ratio = score / total;
  const tier = TIERS.find((t) => ratio >= t.min) ?? TIERS[3];
  const { Icon } = tier;

  return (
    <div className="relative text-center">
      {!reduced && ratio >= 0.7 ? <Confetti /> : null}

      <ScoreRing score={score} total={total} />

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.9 }}
        className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-cta px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        <Icon className="size-4" aria-hidden="true" />
        {tier.title}
      </motion.div>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground"
        aria-live="polite"
      >
        You scored {score} out of {total}. {tier.message}
      </motion.p>

      <motion.dl
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.25 }}
        className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-3"
      >
        {[
          { label: "Correct", value: score, className: "text-cyan" },
          { label: "Missed", value: total - score, className: "text-coral" },
          { label: "Best streak", value: bestStreak, className: "text-lavender" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-glass-border bg-glass px-3 py-3">
            <dt className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </dt>
            <dd className={`mt-1 font-display text-2xl font-bold ${s.className}`}>{s.value}</dd>
          </div>
        ))}
      </motion.dl>

      <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-muted-foreground">
        Every explanation is based on Philippine law or official statistics. Revisit the Laws &amp;
        Rights page to read the source texts.
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Play again
      </button>
    </div>
  );
}

export function MythOrFact() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answer, setAnswer] = useState<null | boolean>(null);
  const [done, setDone] = useState(false);
  // Start in source order so server and client render the same markup, then
  // shuffle once mounted. Each restart draws a fresh order.
  const [questions, setQuestions] = useState(quizItems);

  useEffect(() => {
    setQuestions(shuffled(quizItems));
  }, []);

  const item = questions[index]!;
  const correct = answer !== null && answer === item.isMyth;

  const choose = (isMyth: boolean) => {
    if (answer !== null) return;
    setAnswer(isMyth);
    if (isMyth === item.isMyth) {
      setScore((s) => s + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
  };

  const restart = () => {
    setQuestions(shuffled(quizItems));
    setIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswer(null);
    setDone(false);
  };

  const progress = ((index + (answer !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <GlassCard className="overflow-hidden p-6 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Myth or Fact?</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground" aria-live="polite">
          <AnimatePresence>
            {!done && streak >= 2 ? (
              <motion.span
                key={streak}
                initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="inline-flex items-center gap-1 rounded-full bg-coral/15 px-2.5 py-0.5 text-xs font-semibold text-coral"
              >
                <Flame className="size-3.5" aria-hidden="true" />
                {streak} in a row
              </motion.span>
            ) : null}
          </AnimatePresence>
          <span>
            {done ? "Finished" : `Question ${index + 1} of ${questions.length}`} · Score{" "}
            <motion.span
              key={score}
              initial={reduced || score === 0 ? false : { scale: 1.6, color: "var(--cyan)" }}
              animate={{ scale: 1, color: "var(--muted-foreground)" }}
              transition={{ duration: 0.4 }}
              className="inline-block font-semibold"
            >
              {score}
            </motion.span>
          </span>
        </div>
      </div>

      <div
        className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-glass-strong"
        role="progressbar"
        aria-valuenow={Math.round(done ? 100 : progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Quiz progress"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-cta"
          animate={{ width: `${done ? 100 : progress}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
            className="mt-7"
          >
            <Result score={score} bestStreak={bestStreak} onRestart={restart} />
          </motion.div>
        ) : (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7"
          >
            <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">
              “{item.statement}”
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => choose(true)}
                disabled={answer !== null}
                className="min-w-32 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-coral/60 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                Myth
              </button>
              <button
                type="button"
                onClick={() => choose(false)}
                disabled={answer !== null}
                className="min-w-32 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-cyan/60 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                Fact
              </button>
            </div>

            <AnimatePresence>
              {answer !== null ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={false}
                    animate={
                      reduced ? {} : correct ? { scale: [1, 1.03, 1] } : { x: [0, -8, 8, -5, 5, 0] }
                    }
                    transition={{ duration: 0.45, delay: 0.15 }}
                    className={`mt-6 rounded-2xl border bg-glass p-5 ${
                      correct ? "border-cyan/50" : "border-coral/50"
                    }`}
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      {correct ? (
                        <CheckCircle2 className="size-5 text-cyan" aria-hidden="true" />
                      ) : (
                        <XCircle className="size-5 text-coral" aria-hidden="true" />
                      )}
                      {correct ? "Correct" : "Not quite"} — this statement is a{" "}
                      {item.isMyth ? "MYTH" : "FACT"}.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.explanation}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <SourceTag label={item.sourceLabel} />
                      <button
                        type="button"
                        onClick={next}
                        className="rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        {index + 1 >= questions.length ? "See my score" : "Next question"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
