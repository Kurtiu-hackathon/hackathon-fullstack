import Image from "public/logo-soujunior"

type DashboardSidebarProps = {
  open: boolean
  onClose: () => void
}

export function DashboardSidebar({
  open,
  onClose,
}: DashboardSidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-primary-foreground/10 bg-foreground text-background transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-6 py-8">
          <div className="flex items-center justify-between">
            <a
              href="/"
              aria-label="SouJunior"
              className="no-underline"
            >
              <Image
                src="/logo-soujunior.png"
                alt="SouJunior"
                width={190}
                height={70}
                priority
                className="h-auto w-44"
              />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="flex h-12 w-12 items-center justify-center border border-background/20 text-2xl lg:hidden"
            >
              ×
            </button>
          </div>

          <div className="mt-10 border border-background/15 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-primary text-xl font-bold text-primary-foreground">
                ML
              </div>

              <div>
                <p className="font-bold">
                  Marina Lopes
                </p>

                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  Apoiadora · R$ 25
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-background/40">
              Painel
            </p>

            <div className="space-y-1">
              <a
                href="#visao-geral"
                className="block bg-primary px-5 py-4 text-base text-primary-foreground no-underline"
              >
                Visão geral
              </a>

              <a
                href="#eventos"
                className="block px-5 py-4 text-base text-background/75 no-underline transition-colors hover:bg-background/5"
              >
                Eventos
              </a>

              <a
                href="#premios"
                className="block px-5 py-4 text-base text-background/75 no-underline transition-colors hover:bg-background/5"
              >
                Prêmios
              </a>

              <a
                href="#forum"
                className="block px-5 py-4 text-base text-background/75 no-underline transition-colors hover:bg-background/5"
              >
                Fórum
              </a>
            </div>

            <p className="mb-4 mt-8 text-xs uppercase tracking-[0.25em] text-background/40">
              Apoio
            </p>

            <div className="space-y-1">
              <a
                href="#contribuicao"
                className="block px-5 py-4 text-base text-background/75 no-underline transition-colors hover:bg-background/5"
              >
                Minha contribuição
              </a>

              <a
                href="/"
                className="block px-5 py-4 text-base text-background/75 no-underline transition-colors hover:bg-background/5"
              >
                Landing pública
              </a>
            </div>
          </nav>

          <div className="mt-auto">
            <div className="border border-background/15 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Meta de junho
              </p>

              <div
                className="mt-5 h-2 border border-background/20"
                aria-label="69,6% da meta de junho"
              >
                <div className="h-full w-[70%] bg-primary" />
              </div>

              <p className="mt-4 text-sm text-background/75">
                R$ 3.480 de R$ 5.000
              </p>
            </div>

            <button
              type="button"
              className="mt-8 text-sm text-background/60 transition-colors hover:text-background"
            >
              Sair da conta
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}