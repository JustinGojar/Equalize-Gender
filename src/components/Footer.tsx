import { Link } from "@tanstack/react-router";
import { navItems } from "./Navbar";

export function Footer() {
  return (
    <footer className="mt-24 pb-10">
      <div className="section-shell">
        <div className="glass-strong rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <p className="font-display text-xl font-bold tracking-tight text-foreground">
                EQUALIZE
              </p>
              <p className="mt-2 text-sm text-lavender">Equality Starts With Awareness.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A gender awareness and inclusion platform focused on gender-based violence and
                harassment, built around official Philippine data and law.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                Explore
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
                {navItems
                  .filter((i) => i.to !== "/")
                  .map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          <p className="mt-10 border-t border-glass-border pt-6 text-xs leading-relaxed text-muted-foreground">
            Educational project created for academic purposes. Statistics and legal information
            should be verified through the linked official sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
