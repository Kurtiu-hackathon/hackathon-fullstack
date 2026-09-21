import { Blueprint } from "@/components/ui/blueprint"

import { dashboardStats } from "../_data/stats"

export function DashboardStats() {
  return (
    <section
      id="visao-geral"
      className="border-x border-b border-border"
    >
      <div className="grid grid-cols-2">
        {dashboardStats.map((stat) => (
          <Blueprint
            key={stat.label}
            className="min-h-44 border-0 border-r border-b border-border p-6 sm:min-h-52 sm:p-9"
          >
            <strong
              className={
                stat.highlighted
                  ? "block text-4xl font-black text-primary sm:text-6xl"
                  : "block text-5xl font-black sm:text-6xl"
              }
            >
              {stat.value}
            </strong>

            <span className="mt-4 block max-w-32 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:max-w-none">
              {stat.label}
            </span>
          </Blueprint>
        ))}
      </div>
    </section>
  )
}