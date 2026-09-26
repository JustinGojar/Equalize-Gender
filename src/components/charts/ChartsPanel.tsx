import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const GenderCharts = lazy(() => import("./GenderCharts"));

function Skeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-hidden="true">
      <div className="glass h-80 animate-pulse rounded-3xl" />
      <div className="glass h-80 animate-pulse rounded-3xl" />
    </div>
  );
}

export function ChartsPanel() {
  return (
    <ClientOnly fallback={<Skeleton />}>
      <Suspense fallback={<Skeleton />}>
        <GenderCharts />
      </Suspense>
    </ClientOnly>
  );
}
