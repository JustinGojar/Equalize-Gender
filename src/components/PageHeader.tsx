import type { ReactNode } from "react";
import { SectionTitle } from "./SectionTitle";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
}) {
  return (
    <section className="section-shell pt-14 pb-10 sm:pt-20 animate-rise">
      <SectionTitle as="h1" eyebrow={eyebrow} title={title} lead={lead} />
    </section>
  );
}
