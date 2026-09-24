import { Menu } from "lucide-react"
import type { ActiveSection } from "./dashboard-types"

const SECTION_TITLES: Record<ActiveSection, string> = {
  overview: "Visão geral",
  events: "Eventos",
  awards: "Prêmios",
  forum: "Fórum",
}

type DashboardHeaderProps = {
  onMenuClick: () => void
  activeSection: ActiveSection
}

export function DashboardHeader({ onMenuClick, activeSection }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3.5">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir menu"
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-border bg-transparent transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            <Menu size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Painel do apoiador
            </p>
            <h1 className="font-heading text-[clamp(19px,2.2vw,26px)] font-bold leading-tight">
              {SECTION_TITLES[activeSection]}
            </h1>
          </div>
        </div>

        <a
          href="https://apoia.se/soujunior"
          target="_blank"
          rel="noopener"
          className="hidden shrink-0 items-center bg-primary px-4 py-3 font-heading text-[12.5px] font-semibold uppercase tracking-[0.04em] text-primary-foreground no-underline transition-colors hover:bg-[var(--accent-600)] sm:inline-flex"
        >
          Aumentar apoio
        </a>
      </div>
    </header>
  )
}
