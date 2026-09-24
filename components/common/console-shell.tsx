"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@components/ui/sidebar"
import { PlatformSidebar, type NavGroup } from "@components/common/platform-sidebar"

export type { NavGroup }

const CONSOLE_SIDEBAR_STYLE: React.CSSProperties = {
  "--sidebar": "var(--navy)",
  "--sidebar-foreground": "white",
  "--sidebar-accent": "color-mix(in srgb, white 10%, transparent)",
  "--sidebar-accent-foreground": "white",
  "--sidebar-border": "color-mix(in srgb, white 10%, transparent)",
  "--sidebar-ring": "var(--primary)",
} as React.CSSProperties

function getNavMeta(
  pathname: string,
  navGroups: NavGroup[],
): { title: string; group: string } {
  for (const group of navGroups) {
    for (const item of group.items) {
      if (!item.href.startsWith("http") && pathname === item.href) {
        return { title: item.label, group: group.label }
      }
    }
  }
  return { title: "Visão geral", group: "Plataforma" }
}

type ConsoleShellProps = {
  navGroups: NavGroup[]
  roleLabel: string
  user: { name: string; initials: string }
  children: React.ReactNode
  defaultOpen?: boolean
  contentClassName?: string
}

export function ConsoleShell({
  navGroups,
  roleLabel,
  user,
  children,
  defaultOpen = true,
  contentClassName,
}: ConsoleShellProps) {
  const wrapperClass =
    contentClassName !== undefined
      ? contentClassName
      : "px-6 py-6 lg:px-8 lg:py-8"

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "16rem",
          ...CONSOLE_SIDEBAR_STYLE,
        } as React.CSSProperties
      }
    >
      <PlatformSidebar
        variant="console"
        navGroups={navGroups}
        user={{ ...user, roleLabel }}
        sidebarStyle={CONSOLE_SIDEBAR_STYLE}
      />
      <SidebarInset id="main-content">
        <ConsoleHeader navGroups={navGroups} />
        <div className={wrapperClass}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

type ConsoleHeaderProps = { navGroups: NavGroup[] }

function ConsoleHeader({ navGroups }: ConsoleHeaderProps) {
  const pathname = usePathname()
  const { title, group } = getNavMeta(pathname, navGroups)

  const now = new Date()
  const formatted = now.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  })
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="flex min-h-[56px] items-center justify-between gap-3.5 px-4 sm:px-6 lg:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="md:hidden" />

          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Console · {group}
            </p>
            <h1 className="font-heading text-[clamp(17px,1.8vw,22px)] font-bold leading-tight">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-[11.5px] text-muted-foreground sm:block">
            Atualizado {formatted} · {time}
          </span>
          <Link
            href="/dashboard"
            className="border border-border px-3 py-2 font-heading text-[11.5px] uppercase tracking-[0.04em] text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
          >
            Painel do apoiador
          </Link>
        </div>
      </div>
    </header>
  )
}
