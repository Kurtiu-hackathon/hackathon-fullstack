import Link from "next/link"

import { Blueprint } from "@components/ui/blueprint"
import { ACTIVITY_ITEMS } from "@lib/mock/admin/activity"
import { CHART_BARS_NORMALIZED } from "@lib/mock/admin/chart"
import { HEALTH_ITEMS, STATUS_COLORS } from "@lib/mock/admin/health"
import { KPIS } from "@lib/mock/admin/kpis"
import { PENDING_ITEMS_ADMIN } from "@lib/mock/admin/pending"
import { TIERS } from "@lib/mock/admin/tiers"

export function SuperAdminOverview() {
  return (
    <div className="flex flex-col gap-5">
      <div
        className="grid border border-border"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))" }}
      >
        {KPIS.map((kpi) => (
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
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}
      >
        <Blueprint className="col-span-full p-[18px]">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2.5">
            <h2 className="font-heading text-[16px] font-bold">
              Arrecadação mensal · 12 meses
            </h2>
            <p className="text-[12px] text-muted-foreground">
              <strong className="text-foreground">R$ 14.820</strong> em set · +5,0% vs. ago
            </p>
          </div>
          <div
            className="grid items-end gap-1.5 border-b border-border"
            style={{
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              height: 160,
              background:
                "repeating-linear-gradient(to top, transparent 0, transparent 39px, color-mix(in srgb, var(--color-text) 7%, transparent) 39px, color-mix(in srgb, var(--color-text) 7%, transparent) 40px)",
            }}
          >
            {CHART_BARS_NORMALIZED.map((bar) => (
              <div
                key={bar.label}
                title={`R$ ${bar.value.toLocaleString("pt-BR")}`}
                className="border border-b-0 border-primary"
                style={{
                  height: bar.height,
                  background: bar.current
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-accent) 35%, transparent)",
                }}
              />
            ))}
          </div>
          <div
            className="mt-1.5 grid gap-1.5"
            style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
          >
            {CHART_BARS_NORMALIZED.map((bar) => (
              <p
                key={bar.label}
                className="text-center text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
              >
                {bar.label}
              </p>
            ))}
          </div>
        </Blueprint>

        <Blueprint className="p-[18px]">
          <div className="mb-4 flex items-baseline justify-between gap-2.5">
            <h2 className="font-heading text-[16px] font-bold">Apoiadores por nível</h2>
            <p className="text-[12px] text-muted-foreground">612 ativos</p>
          </div>
          <div className="flex flex-col gap-3.5">
            {TIERS.map((tier) => (
              <div key={tier.name} className="flex flex-col gap-1">
                <div className="flex justify-between text-[12.5px]">
                  <span>{tier.name}</span>
                  <span className="text-muted-foreground">
                    {tier.count} · {tier.share}%
                  </span>
                </div>
                <div className="h-2.5 border border-border">
                  <div className="h-full bg-primary" style={{ width: `${tier.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Blueprint>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
      >
        <Blueprint className="p-[18px]">
          <h2 className="mb-3 font-heading text-[16px] font-bold">Pendências</h2>
          <div className="flex flex-col">
            {PENDING_ITEMS_ADMIN.map((item) => (
              <Link
                key={item.label}
                href={`/super-admin/${item.section}`}
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
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-heading text-[16px] font-bold">Atividade recente</h2>
            <Link
              href="/super-admin/audit"
              className="text-[12px] text-primary no-underline transition-colors hover:underline"
            >
              Log completo →
            </Link>
          </div>
          <div className="flex flex-col">
            {ACTIVITY_ITEMS.map((item) => (
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
