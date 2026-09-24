import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { createClient } from "@lib/supabase/server"
import { DashboardShell } from "@components/common/dashboard-shell"
import { ConsoleShell } from "@components/common/console-shell"
import { ADMIN_NAV, SUPER_ADMIN_NAV, MODERATOR_NAV } from "@components/common/nav-configs"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

type ProfileLayoutProps = {
  children: React.ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) {
    redirect("/login?next=/profile")
  }

  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  const role = data.claims.app_metadata?.role as string | undefined
  const email = user?.email ?? ""
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>

  const userName: string =
    (meta.display_name as string | undefined) ??
    (meta.full_name as string | undefined) ??
    email.split("@")[0] ??
    ""

  const userInitials =
    userName
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() ?? "")
      .join("") || email[0]?.toUpperCase() || "U"

  const userProps = { name: userName, initials: userInitials }

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  if (role === "ADMIN") {
    return (
      <ConsoleShell
        navGroups={ADMIN_NAV}
        roleLabel="Admin"
        user={userProps}
        defaultOpen={defaultOpen}
        contentClassName=""
      >
        {children}
      </ConsoleShell>
    )
  }

  if (role === "SUPER_ADMIN") {
    return (
      <ConsoleShell
        navGroups={SUPER_ADMIN_NAV}
        roleLabel="Super Admin"
        user={userProps}
        defaultOpen={defaultOpen}
        contentClassName=""
      >
        {children}
      </ConsoleShell>
    )
  }

  if (role === "MODERATOR") {
    return (
      <ConsoleShell
        navGroups={MODERATOR_NAV}
        roleLabel="Moderador"
        user={userProps}
        defaultOpen={defaultOpen}
        contentClassName=""
      >
        {children}
      </ConsoleShell>
    )
  }

  return (
    <DashboardShell user={userProps} defaultOpen={defaultOpen} contentClassName="">
      {children}
    </DashboardShell>
  )
}
