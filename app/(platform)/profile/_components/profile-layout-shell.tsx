"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "cn"
import { PlatformSidebarProvider, usePlatformSidebar } from "./platform-sidebar-context"
import { ProfileSidebar } from "./profile-sidebar"

type ProfileLayoutShellProps = {
  role: string | undefined
  userName: string
  userInitials: string
  children: React.ReactNode
}

export function ProfileLayoutShell({
  role,
  userName,
  userInitials,
  children,
}: ProfileLayoutShellProps) {
  return (
    <PlatformSidebarProvider>
      <ProfileLayoutContent role={role} userName={userName} userInitials={userInitials}>
        {children}
      </ProfileLayoutContent>
    </PlatformSidebarProvider>
  )
}

function ProfileLayoutContent({
  role,
  userName,
  userInitials,
  children,
}: ProfileLayoutShellProps) {
  const { open, toggle } = usePlatformSidebar()

  const isConsoleSidebar =
    role === "ADMIN" || role === "MODERATOR" || role === "SUPER_ADMIN"

  const backHref =
    role === "ADMIN"
      ? "/admin"
      : role === "MODERATOR"
        ? "/moderator"
        : role === "SUPER_ADMIN"
          ? "/super-admin"
          : "/dashboard"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProfileSidebar role={role} userName={userName} userInitials={userInitials} />

      <div className={cn("flex flex-col", isConsoleSidebar ? "lg:pl-64" : "lg:pl-72")}>
        <header className="sticky top-0 z-40 border-b border-border bg-background">
          <div className="flex items-center gap-3 px-6 py-4">
            <button
              type="button"
              onClick={toggle}
              aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={open}
              aria-controls={
                isConsoleSidebar
                  ? `${role?.toLowerCase().replace("_", "-")}-sidebar`
                  : "dashboard-sidebar"
              }
              className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-accent lg:hidden"
            >
              <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <nav aria-label="Navegação estrutural">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href={backHref}
                    className="transition-colors hover:text-foreground"
                  >
                    Conta
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-foreground" aria-current="page">
                  Meu Perfil
                </li>
              </ol>
            </nav>
          </div>
        </header>

        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
