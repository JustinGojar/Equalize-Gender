import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SourceTag } from "./SourceTag";
import type { Stat } from "@/data/genderData";

function useCountUp(target: number, decimals: number, active: boolean) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, decimals, reduced]);

  return value.toFixed(decimals);
}

export function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(false);
  const shown = useCountUp(stat.value, stat.decimals ?? 0, inView);

  return (
    <div ref={ref} className="h-full">
      <GlassCard interactive className="flex h-full flex-col">
        <p
          className="font-display text-4xl font-semibold text-gradient sm:text-5xl"
          aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`}
        >
          {stat.prefix}
          {shown}
          {stat.suffix}
        </p>
        <h3 className="mt-3 text-base font-semibold text-foreground">{stat.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.definition}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <SourceTag label={stat.sourceLabel} sourceId={stat.sourceId} />
          <span className="inline-flex items-center rounded-full border border-glass-border bg-glass px-3 py-1 text-[0.7rem] text-muted-foreground">
            Reference year: {stat.referenceYear}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-glass-border bg-glass-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-cyan/50 active:scale-[0.98]"
        >
          What does this statistic mean?
          <ChevronDown
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        {open ? (
          <p className="mt-3 rounded-2xl border border-glass-border bg-glass p-4 text-sm leading-relaxed text-muted-foreground animate-rise">
            {stat.meaning}
          </p>
        ) : null}
      </GlassCard>
    </div>
  );
}
