"use client"

import { usePathname } from "next/navigation"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@components/ui/sidebar"
import { PlatformSidebar } from "@components/common/platform-sidebar"
import { DASHBOARD_NAV } from "@components/common/nav-configs"

const DASHBOARD_SIDEBAR_STYLE: React.CSSProperties = {
  "--sidebar": "var(--color-text)",
  "--sidebar-foreground": "var(--color-bg)",
  "--sidebar-accent": "var(--primary)",
  "--sidebar-accent-foreground": "var(--color-bg)",
  "--sidebar-border": "color-mix(in srgb, var(--color-bg) 10%, transparent)",
  "--sidebar-ring": "var(--primary)",
} as React.CSSProperties

const SECTION_TITLES: Record<string, string> = {
  overview: "Visão geral",
  events: "Eventos",
  awards: "Prêmios",
  forum: "Fórum",
  profile: "Meu Perfil",
}

function GoalWidget() {
  return (
    <div
      className="border border-sidebar-foreground/15 p-4"
      role="region"
      aria-label="Meta mensal de arrecadação"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
        Meta de junho
      </p>
      <div
        className="mt-2 h-2 border border-sidebar-foreground/22"
        role="progressbar"
        aria-label="69,6% da meta de junho"
        aria-valuenow={69.6}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full w-[70%] bg-primary" />
      </div>
      <p className="mt-2 text-[12.5px] text-sidebar-foreground/60">
        R$ 3.480 de R$ 5.000
      </p>
    </div>
  )
}

type DashboardShellProps = {
  user: { name: string; initials: string }
  children: React.ReactNode
  defaultOpen?: boolean
  contentClassName?: string
}

export function DashboardShell({
  user,
  children,
  defaultOpen = true,
  contentClassName,
}: DashboardShellProps) {
  const wrapperClass =
    contentClassName !== undefined
      ? contentClassName
      : "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8"

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "18rem",
          ...DASHBOARD_SIDEBAR_STYLE,
        } as React.CSSProperties
      }
    >
      <PlatformSidebar
        variant="dashboard"
        navGroups={DASHBOARD_NAV}
        user={{ ...user, roleLabel: "Apoiador" }}
        footerWidget={<GoalWidget />}
        sidebarStyle={DASHBOARD_SIDEBAR_STYLE}
      />
      <SidebarInset id="main-content">
        <DashboardHeader />
        <div className={wrapperClass}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function DashboardHeader() {
  const pathname = usePathname()
  const segment = pathname.split("/").filter(Boolean).pop() ?? "overview"
  const title = SECTION_TITLES[segment] ?? "Painel"

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3.5">
          <SidebarTrigger className="md:hidden" />

          <div className="min-w-0">
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Painel do apoiador
            </p>
            <h1 className="font-heading text-[clamp(19px,2.2vw,26px)] font-bold leading-tight">
              {title}
            </h1>
          </div>
        </div>

        <a
          href="https://apoia.se/soujunior"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center bg-primary px-4 py-3 font-heading text-[12.5px] font-semibold uppercase tracking-[0.04em] text-primary-foreground no-underline transition-colors hover:bg-[var(--accent-600)] sm:inline-flex"
        >
          Aumentar apoio
          <span className="sr-only"> (abre em nova janela)</span>
        </a>
      </div>
    </header>
  )
}
