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
            className="flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-background text-foreground lg:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-7 bg-current" />
              <span className="block h-0.5 w-7 bg-current" />
              <span className="block h-0.5 w-7 bg-current" />
            </span>
          </button>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Painel do apoiador
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              Oi, Marina 👋
            </h1>
          </div>
        </div>

        <a
          href="#apoio"
          className="hidden min-h-20 items-center justify-center bg-primary px-8 text-sm font-bold text-primary-foreground no-underline transition-opacity hover:opacity-90 sm:flex"
        >
          AUMENTAR APOIO
        </a>
      </div>
    </header>
  )
}