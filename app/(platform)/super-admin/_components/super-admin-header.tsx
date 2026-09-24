import { Menu } from "lucide-react"

import {
  SECTION_GROUPS,
  SECTION_TITLES,
  type SuperAdminSection,
} from "./super-admin-types"

type SuperAdminHeaderProps = {
  sidebarOpen: boolean
  onMenuClick: () => void
  activeSection: SuperAdminSection
  menuButtonRef: React.Ref<HTMLButtonElement>
}

export function SuperAdminHeader({
  sidebarOpen,
  onMenuClick,
  activeSection,
  menuButtonRef,
}: SuperAdminHeaderProps) {
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
          <button
            ref={menuButtonRef}
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir menu"
            aria-expanded={sidebarOpen}
            aria-controls="super-admin-sidebar"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-transparent transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            <Menu size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Console · {SECTION_GROUPS[activeSection]}
            </p>
            <h1 className="font-heading text-[clamp(17px,1.8vw,22px)] font-bold leading-tight">
              {SECTION_TITLES[activeSection]}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-[11.5px] text-muted-foreground sm:block">
            Atualizado {formatted} · {time}
          </span>
          <a
            href="/dashboard"
            className="border border-border px-3 py-2 font-heading text-[11.5px] uppercase tracking-[0.04em] text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
          >
            Painel do apoiador
          </a>
        </div>
      </div>
    </header>
  )
}
