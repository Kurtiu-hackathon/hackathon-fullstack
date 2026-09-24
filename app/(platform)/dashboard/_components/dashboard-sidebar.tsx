import Image from "next/image"
import { X } from "lucide-react"

import { signOutAction } from "@lib/server/auth"

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
              className="flex h-12 w-12 items-center justify-center border border-background/20 text-background transition-colors hover:border-accent-700 hover:text-accent-700 lg:hidden"
            >
              <X
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mt-10 border border-background/15 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-primary font-heading text-xl font-semibold text-primary-foreground">
                ML
              </div>

              <div>
                <p className="font-heading font-semibold text-background">
                  Marina Lopes
                </p>

                <p className="mt-1 font-heading text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                  Apoiadora · R$ 25
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-10" aria-label="Navegação do painel">
            <p className="mb-4 font-heading text-xs font-semibold tracking-[0.25em] text-background/40 uppercase">
              Painel
            </p>

            <div className="space-y-1">
              <a
                href="#visao-geral"
                className="block bg-primary px-5 py-4 font-body text-base text-primary-foreground no-underline"
              >
                Visão geral
              </a>

              <a
                href="#eventos"
                className="block px-5 py-4 font-body text-base text-background/75 no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Eventos
              </a>

              <a
                href="#premios"
                className="block px-5 py-4 font-body text-base text-background/75 no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Prêmios
              </a>

              <a
                href="#forum"
                className="block px-5 py-4 font-body text-base text-background/75 no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Fórum
              </a>
            </div>

            <p className="mb-4 mt-8 font-heading text-xs font-semibold tracking-[0.25em] text-background/40 uppercase">
              Apoio
            </p>

            <div className="space-y-1">
              <a
                href="#contribuicao"
                className="block px-5 py-4 font-body text-base text-background/75 no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Minha contribuição
              </a>

              <a
                href="/"
                className="block px-5 py-4 font-body text-base text-background/75 no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Landing pública
              </a>
            </div>
          </nav>

          <div className="mt-auto">
            <div className="border border-background/15 p-5">
              <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Meta de junho
              </p>

              <div
                className="mt-5 h-2 border border-background/20"
                role="progressbar"
                aria-label="69,6% da meta de junho"
                aria-valuenow={69.6}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-full w-[69.6%] bg-primary" />
              </div>

              <p className="mt-4 font-body text-sm text-background/75">
                R$ 3.480 de R$ 5.000
              </p>
            </div>

            <form action={signOutAction}>
              <button
                type="submit"
                className="mt-8 font-body text-sm text-background/60 transition-colors hover:text-accent-700"
              >
                Sair da conta
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  )
}
