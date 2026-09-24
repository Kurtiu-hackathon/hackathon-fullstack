"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

import { signOutAction } from "@lib/server/auth"
import { cn } from "cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@components/ui/sidebar"

export type NavItem = {
  href: string
  label: string
  badge?: number
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

type PlatformSidebarProps = {
  variant: "dashboard" | "console"
  navGroups: NavGroup[]
  user: { name: string; initials: string; roleLabel: string }
  footerWidget?: React.ReactNode
  sidebarStyle?: React.CSSProperties
}

export function PlatformSidebar({
  variant,
  navGroups,
  user,
  footerWidget,
  sidebarStyle,
}: PlatformSidebarProps) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const isConsole = variant === "console"

  return (
    <Sidebar collapsible="offcanvas" sidebarStyle={sidebarStyle}>
      <SidebarHeader className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <Link href="/" aria-label="SouJunior" className="no-underline">
            <Image
              src="/icos/logo-white.svg"
              alt="SouJunior"
              width={isConsole ? 110 : 190}
              height={isConsole ? 40 : 70}
              priority
              className={cn("h-auto", isConsole ? "w-[110px]" : "w-44")}
            />
          </Link>
          {isConsole && (
            <span className="border border-sidebar-ring/45 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.2em] text-sidebar-ring">
              Console
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1.5">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-1.5">
            <SidebarGroupLabel className="mb-1 px-2 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/55">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isExternal = item.href.startsWith("http")
                const isActive = !isExternal && pathname === item.href

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={
                        isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ) : (
                          <Link href={item.href} />
                        )
                      }
                      isActive={isActive}
                      onClick={() => setOpenMobile(false)}
                      className="rounded-none min-h-[44px] px-2 text-[13.5px] text-sidebar-foreground"
                    >
                      {item.label}
                      {isExternal && (
                        <span className="sr-only"> (abre em nova janela)</span>
                      )}
                    </SidebarMenuButton>
                    {item.badge !== undefined && (
                      <SidebarMenuBadge className="rounded-none bg-primary px-1 text-[10.5px] text-primary-foreground">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        {footerWidget && <div className="mb-3 px-2">{footerWidget}</div>}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex w-full items-center gap-2.5 px-2 py-2 text-left transition-colors",
              "hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
            )}
          >
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center bg-primary font-heading text-[12px] font-bold text-primary-foreground">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="font-heading text-[13px] font-semibold text-sidebar-foreground">
                {user.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/60">
                {user.roleLabel}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-48">
            <DropdownMenuItem onClick={() => signOutAction()}>
              <LogOut size={14} strokeWidth={1.5} />
              {isConsole ? "Sair do console" : "Sair da conta"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
