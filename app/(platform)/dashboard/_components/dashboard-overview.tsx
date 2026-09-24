import { Blueprint } from "@/components/ui/blueprint"
import { cn } from "cn"
import { DashboardEvents } from "./dashboard-events"
import { DashboardAwards } from "./dashboard-awards"
import { DashboardForum } from "./dashboard-forum"

const STATS = [
  { value: "18", label: "meses de apoio", accent: false },
  { value: "R$ 450", label: "total contribuído", accent: true },
  { value: "6", label: "prêmios recebidos", accent: false },
  { value: "9", label: "mentorias bancadas", accent: false },
]

const MONTHS = Array.from({ length: 24 }, (_, i) => ({
  filled: i < 18,
  label: i < 18 ? `Mês ${i + 1} — apoio confirmado` : `Mês ${i + 1} — a conquistar`,
}))

export function DashboardOverview() {
  return (
    <div className="flex flex-col gap-[clamp(20px,3vw,34px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] border border-border">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="border-b border-r border-border p-[22px_20px]"
          >
            <div
              className={cn(
                "font-heading text-[40px] font-extrabold leading-[0.95]",
                stat.accent && "text-primary"
              )}
            >
              {stat.value}
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <Blueprint className="p-[22px_20px]">
        <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-heading text-[19px] font-bold">Sua trilha de apoio</h2>
          <p className="text-[12.5px] text-muted-foreground">
            18 de 24 meses até o selo{" "}
            <strong className="text-foreground">Fundador</strong>
          </p>
        </div>
        <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-[3px]">
          {MONTHS.map((m, i) => (
            <div
              key={i}
              title={m.label}
              className={cn(
                "h-[34px] border border-border",
                m.filled ? "bg-primary" : "bg-transparent"
              )}
            />
          ))}
        </div>
      </Blueprint>

      <DashboardEvents />
      <DashboardAwards />
      <DashboardForum />
    </div>
  )
}
