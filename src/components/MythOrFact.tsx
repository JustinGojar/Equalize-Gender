import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SourceTag } from "./SourceTag";
import { quizItems } from "@/data/genderData";

export function MythOrFact() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<null | boolean>(null);
  const [done, setDone] = useState(false);

  const item = quizItems[index];
  const correct = answer !== null && answer === item.isMyth;

  const choose = (isMyth: boolean) => {
    if (answer !== null) return;
    setAnswer(isMyth);
    if (isMyth === item.isMyth) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= quizItems.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setAnswer(null);
    setDone(false);
  };

  const progress = ((index + (answer !== null ? 1 : 0)) / quizItems.length) * 100;

  return (
    <GlassCard className="p-6 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          Myth or Fact?
        </p>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {done ? "Finished" : `Question ${index + 1} of ${quizItems.length}`} · Score {score}
        </p>
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
            <h3 className="font-display text-2xl font-semibold text-foreground">
              You scored {score} out of {quizItems.length}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Every explanation above is based on Philippine law or official statistics. Revisit the
              Laws &amp; Rights page to read the source texts.
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Restart quiz
            </button>
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
                  <div className="mt-6 rounded-2xl border border-glass-border bg-glass p-5">
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
                        {index + 1 >= quizItems.length ? "See my score" : "Next question"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
