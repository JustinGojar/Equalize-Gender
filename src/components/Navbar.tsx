import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/issue", label: "The Issue" },
  { to: "/statistics", label: "Statistics" },
  { to: "/laws", label: "Laws & Rights" },
  { to: "/inclusion", label: "Inclusion" },
  { to: "/take-action", label: "Take Action" },
  { to: "/sources", label: "Sources" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="section-shell pt-3 sm:pt-4">
        <nav
          aria-label="Main navigation"
          className="glass-strong flex items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:px-5"
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5"
            aria-label="EQUALIZE home"
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-gradient-cta font-display text-sm font-bold text-primary-foreground"
            >
              =
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              EQUALIZE
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="group relative inline-flex flex-col items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="mt-1 h-0.5 w-0 rounded-full bg-coral transition-all duration-300 group-hover:w-4 group-data-[status=active]:w-5"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-glass-border bg-glass text-foreground transition-colors hover:bg-glass-strong lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="glass-strong mt-2 flex flex-col rounded-2xl p-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-glass hover:text-foreground data-[status=active]:bg-glass data-[status=active]:text-foreground"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-transparent data-[active]:bg-coral"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
