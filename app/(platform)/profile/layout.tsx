import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { createClient } from "@lib/supabase/server"
import { ProfileLayoutShell } from "./_components/profile-layout-shell"

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

  return (
    <ProfileLayoutShell role={role} userName={userName} userInitials={userInitials}>
      {children}
    </ProfileLayoutShell>
  )
}
