import { Menu } from "lucide-react"

type DashboardHeaderProps = {
  onMenuClick: () => void
}

export function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex min-h-40 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir menu"
            className="flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-accent-700 hover:text-accent-700 lg:hidden"
          >
            <Menu
              size={24}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>

          <div>
            <p className="font-heading text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              Painel do apoiador
            </p>

            <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Oi, Marina 👋
            </h1>
          </div>
        </div>

        <a
          href="https://apoia.se/soujunior"
          target="_blank"
          rel="noopener"
          className="hidden min-h-20 items-center justify-center bg-primary px-8 font-heading text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-accent-700 sm:flex"
        >
          AUMENTAR APOIO
        </a>
      </div>
    </header>
  )
}
