import Link from "next/link"

import { Blueprint } from "@components/ui/blueprint"
import { ACTIVITY_ITEMS } from "@lib/mock/admin/activity"
import { HEALTH_ITEMS, STATUS_COLORS } from "@lib/mock/admin/health"
import { KPIS_MODERATOR } from "@lib/mock/admin/kpis"
import { PENDING_ITEMS_MODERATOR } from "@lib/mock/admin/pending"

export function ModeratorOverview() {
  return (
    <div className="flex flex-col gap-5">
      <div
        className="grid border border-border"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))" }}
      >
        {KPIS_MODERATOR.map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col gap-1.5 border-b border-r border-border p-4"
          >
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
              {kpi.label}
            </p>
            <p className="font-heading text-[28px] font-bold leading-none">{kpi.value}</p>
            <p className="text-[12px] text-primary">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
      >
        <Blueprint className="p-[18px]">
          <h2 className="mb-3 font-heading text-[16px] font-bold">Pendências</h2>
          <div className="flex flex-col">
            {PENDING_ITEMS_MODERATOR.map((item) => (
              <Link
                key={item.label}
                href={`/moderator/${item.section}`}
                className="flex items-center justify-between gap-2.5 border-b border-border px-0 py-2.5 text-left text-[13px] text-foreground no-underline transition-colors hover:text-primary"
              >
                <span>{item.label}</span>
                <span className="flex items-center gap-2">
                  <strong className="font-heading text-[16px]">{item.count}</strong>
                  <span className="text-primary">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Blueprint>

        <Blueprint className="p-[18px]">
          <h2 className="mb-3 font-heading text-[16px] font-bold">Saúde do sistema</h2>
          <div className="flex flex-col">
            {HEALTH_ITEMS.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2.5 border-b border-border py-2.5 text-[13px]"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 border border-border"
                  style={{ background: STATUS_COLORS[item.status] }}
                />
                <span className="flex-1">{item.name}</span>
                <span className="text-[12px] text-muted-foreground">{item.detail}</span>
              </div>
            ))}
          </div>
        </Blueprint>

        <Blueprint className="p-[18px]">
          <h2 className="mb-3 font-heading text-[16px] font-bold">Atividade recente</h2>
          <div className="flex flex-col">
            {ACTIVITY_ITEMS.slice(0, 4).map((item) => (
              <div
                key={`${item.actor}-${item.when}`}
                className="border-b border-border py-2 text-[13px] leading-snug"
              >
                <p>
                  <strong>{item.actor}</strong>{" "}
                  <span className="text-muted-foreground">{item.action}</span>{" "}
                  {item.target}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{item.when}</p>
              </div>
            ))}
          </div>
        </Blueprint>
      </div>
    </div>
  )
}
