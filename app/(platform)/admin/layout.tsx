import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { createClient } from "@lib/supabase/server"
import { ConsoleShell } from "@components/common/console-shell"
import { ADMIN_NAV } from "@components/common/nav-configs"

type AdminLayoutProps = {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  const role = data?.claims?.app_metadata?.role as string | undefined

  if (error || role !== "ADMIN") {
    redirect("/dashboard")
  }

  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  const fullName = user?.user_metadata?.full_name as string | undefined
  const email = user?.email ?? ""
  const userName = fullName ?? email.split("@")[0] ?? "Admin"
  const userInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <ConsoleShell
      navGroups={ADMIN_NAV}
      roleLabel="Admin"
      user={{ name: userName, initials: userInitials }}
      defaultOpen={defaultOpen}
    >
      {children}
    </ConsoleShell>
  )
}
