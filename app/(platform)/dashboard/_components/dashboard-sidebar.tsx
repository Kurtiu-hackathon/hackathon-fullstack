"use client"

import Image from "next/image"
import Link from "next/link"
import { LogOut, X } from "lucide-react"

import { signOutAction } from "@lib/server/auth"
import { cn } from "cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import type { ActiveSection } from "./dashboard-types"

type DashboardSidebarProps = {
  open: boolean
  isMobile: boolean
  onClose: () => void
  activeSection: ActiveSection
  onNavigate: (section: ActiveSection) => void
}

const NAV_PAINEL: { id: ActiveSection; label: string }[] = [
  { id: "overview", label: "Visão geral" },
  { id: "events", label: "Eventos" },
  { id: "awards", label: "Prêmios" },
  { id: "forum", label: "Fórum" },
]

export function DashboardSidebar({
  open,
  isMobile,
  onClose,
  activeSection,
  onNavigate,
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
        id="dashboard-sidebar"
        aria-label="Painel de navegação"
        aria-hidden={isMobile && !open}
        inert={isMobile && !open}
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-primary-foreground/10 bg-foreground text-background transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-6 py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="SouJunior"
              className="no-underline"
            >
              <Image
                src="/icos/logo-white.svg"
                alt="SouJunior"
                width={190}
                height={70}
                priority
                className="h-auto w-44"
              />
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="flex h-12 w-12 items-center justify-center border border-background/20 text-background transition-colors hover:border-primary hover:text-primary lg:hidden"
            >
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="mt-10 w-full border border-background/15 p-5 text-left transition-colors hover:border-primary/40">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-primary font-heading text-xl font-semibold text-primary-foreground">
                  ML
                </div>

                <div>
                  <p className="font-heading font-semibold text-background">
                    Marina Lopes
                  </p>
                  <p className="mt-1 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Apoiadora · R$ 25
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-56">
              <DropdownMenuItem onClick={() => signOutAction()}>
                <LogOut size={14} strokeWidth={1.5} />
                Sair da conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="mt-10" aria-label="Navegação do painel">
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-background/55">
              Painel
            </p>

            <div className="space-y-px">
              {NAV_PAINEL.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={cn(
                    "block w-full px-3 py-[11px] text-left text-[14px] transition-colors",
                    activeSection === id
                      ? "bg-primary text-primary-foreground"
                      : "text-background/75 hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="mb-2.5 mt-[18px] text-[10px] font-semibold uppercase tracking-[0.2em] text-background/55">
              Apoio
            </p>

            <div className="space-y-px">
              <a
                href="https://apoia.se/soujunior"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-[11px] text-[14px] text-background/75 no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Minha contribuição
                <span className="sr-only"> (abre em nova janela)</span>
              </a>
            </div>
          </nav>

          <div className="mt-auto">
            <div className="border border-background/15 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                Meta de junho
              </p>

              <div
                className="mt-2 h-2 border border-background/22"
                role="progressbar"
                aria-label="69,6% da meta de junho"
                aria-valuenow={69.6}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-full w-[70%] bg-primary" />
              </div>

              <p className="mt-2 text-[12.5px] text-background/60">
                R$ 3.480 de R$ 5.000
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
