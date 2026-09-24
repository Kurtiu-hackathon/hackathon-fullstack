"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, X } from "lucide-react"

import { signOutAction } from "@lib/server/auth"
import { cn } from "cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import {
  NAV_FINANCEIRO,
  NAV_PLATAFORMA,
  type AdminSection,
  type NavItem,
} from "./admin-types"

type AdminSidebarProps = {
  open: boolean
  isMobile: boolean
  onClose: () => void
  activeSection?: AdminSection
  onNavigate?: (section: AdminSection) => void
  userInitials: string
  userName: string
}

function NavGroup({
  title,
  items,
  activeSection,
  onNavigate,
}: {
  title: string
  items: NavItem[]
  activeSection?: AdminSection
  onNavigate?: (s: AdminSection) => void
}) {
  return (
    <div className="flex flex-col gap-px">
      <p className="px-2 pb-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#59647a]">
        {title}
      </p>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onNavigate?.(item.id)}
          aria-current={activeSection === item.id ? "page" : undefined}
          className={cn(
            "flex w-full items-center justify-between px-2 py-[10px] text-left text-[13.5px] transition-colors",
            activeSection === item.id
              ? "bg-primary text-white"
              : "text-white/75 hover:bg-white/10 hover:text-white"
          )}
        >
          <span>{item.label}</span>
          {item.badge !== undefined && (
            <span className="min-w-[18px] bg-primary px-1 py-px text-center text-[10.5px] text-white">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export function AdminSidebar({
  open,
  isMobile,
  onClose,
  activeSection,
  onNavigate,
  userInitials,
  userName,
}: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0b1220]/50 lg:hidden"
        />
      )}

      <aside
        id="admin-sidebar"
        aria-label="Navegação do console"
        aria-hidden={isMobile && !open}
        inert={isMobile && !open}
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col gap-5 overflow-y-auto border-r border-white/10 bg-[#0b1220] px-3.5 py-[18px] text-white transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-2.5 px-1">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icos/logo-white.svg"
              alt="SouJunior"
              width={110}
              height={40}
              priority
              className="h-auto w-[110px]"
            />
            <span className="border border-[#8eb2fb]/45 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.2em] text-[#8eb2fb]">
              Console
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex h-[30px] w-[30px] items-center justify-center border border-white/30 text-white transition-colors hover:border-white lg:hidden"
          >
            <X size={14} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col gap-3.5" aria-label="Seções do console">
          <NavGroup
            title="Plataforma"
            items={NAV_PLATAFORMA}
            activeSection={activeSection}
            onNavigate={onNavigate}
          />
          <NavGroup
            title="Financeiro"
            items={NAV_FINANCEIRO}
            activeSection={activeSection}
            onNavigate={onNavigate}
          />
          <div className="flex flex-col gap-px">
            <p className="px-2 pb-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#59647a]">
              Conta
            </p>
            <Link
              href="/profile"
              aria-current={pathname === "/profile" ? "page" : undefined}
              className={cn(
                "flex w-full items-center px-2 py-[10px] text-[13.5px] no-underline transition-colors",
                pathname === "/profile"
                  ? "bg-primary text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              Meu Perfil
            </Link>
          </div>
        </nav>

        <div className="mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-2.5 px-1 py-2 text-left transition-colors hover:bg-white/10">
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center bg-primary font-heading text-[12px] font-bold text-white">
                {userInitials}
              </div>
              <div className="min-w-0">
                <p className="font-heading text-[13px] font-semibold">{userName}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#8eb2fb]">
                  Admin
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-48">
              <DropdownMenuItem onClick={() => signOutAction()}>
                <LogOut size={14} strokeWidth={1.5} />
                Sair do console
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  )
}
