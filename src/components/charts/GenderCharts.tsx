import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { ipvTrend } from "@/data/genderData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
);

const token = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

export default function GenderCharts() {
  const violet = token("--chart-1", "#a78bfa");
  const cyan = token("--chart-2", "#7dd3fc");
  const coral = token("--chart-3", "#fb923c");
  const grid = "rgba(255,255,255,0.10)";
  const text = "rgba(236,233,245,0.78)";

  const baseScales = {
    x: { grid: { color: grid }, ticks: { color: text }, border: { color: grid } },
    y: {
      beginAtZero: true,
      grid: { color: grid },
      ticks: { color: text, callback: (v: unknown) => `${v}%` },
      border: { color: grid },
    },
  } as const;

  const common = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: "easeOutQuart" as const },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { y?: number }; raw: unknown }) =>
            `${ctx.parsed.y ?? ctx.raw}% of ever-partnered women and girls aged 15+`,
        },
      },
    },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass rounded-3xl p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">
          Intimate partner violence, past 12 months
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Comparison of reference years 2017 and 2022, Philippines.
        </p>
        <div className="mt-5 h-64 sm:h-72">
          <Bar
            aria-label="Bar chart comparing 14.7% in 2017 with 11.9% in 2022"
            data={{
              labels: ipvTrend.labels,
              datasets: [
                {
                  label: "Proportion",
                  data: ipvTrend.values,
                  backgroundColor: [coral, violet],
                  borderRadius: 14,
                  maxBarThickness: 84,
                },
              ],
            }}
            options={{ ...common, scales: baseScales }}
          />
        </div>
      </div>

      <div className="glass rounded-3xl p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">Direction of change</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          The same indicator plotted across its two available reference years.
        </p>
        <div className="mt-5 h-64 sm:h-72">
          <Line
            aria-label="Line chart showing the indicator decreasing from 14.7% in 2017 to 11.9% in 2022"
            data={{
              labels: ipvTrend.labels,
              datasets: [
                {
                  label: "Proportion",
                  data: ipvTrend.values,
                  borderColor: cyan,
                  backgroundColor: "rgba(125,211,252,0.18)",
                  pointBackgroundColor: cyan,
                  pointRadius: 6,
                  borderWidth: 3,
                  tension: 0.35,
                  fill: true,
                },
              ],
            }}
            options={{ ...common, scales: baseScales }}
          />
        </div>
      </div>

      <div className="glass rounded-3xl p-5 sm:p-6 lg:col-span-2">
        <h3 className="text-base font-semibold text-foreground">
          Reported experience in the previous 12 months, 2022
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Of ever-partnered women and girls aged 15 and older, 11.9% reported physical, sexual or
          psychological violence by a current or former intimate partner in the previous 12 months.
          The remainder did not report such an experience for that period.
        </p>
        <div className="mx-auto mt-5 h-64 max-w-sm sm:h-72">
          <Doughnut
            aria-label="Doughnut chart showing 11.9% reported and 88.1% did not report for the previous 12 months in 2022"
            data={{
              labels: ["Reported (11.9%)", "Did not report (88.1%)"],
              datasets: [
                {
                  data: [11.9, 88.1],
                  backgroundColor: [coral, "rgba(255,255,255,0.12)"],
                  borderColor: "rgba(255,255,255,0.14)",
                  borderWidth: 1,
                  hoverOffset: 8,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: "62%",
              animation: { duration: 1200, easing: "easeOutQuart" },
              plugins: {
                legend: { display: true, position: "bottom", labels: { color: text } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
