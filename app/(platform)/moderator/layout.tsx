import { redirect } from "next/navigation"

import { createClient } from "@lib/supabase/server"

type ModeratorLayoutProps = {
  children: React.ReactNode
}

export default async function ModeratorLayout({ children }: ModeratorLayoutProps) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  const role = data?.claims?.app_metadata?.role as string | undefined

  if (error || role !== "MODERATOR") {
    redirect("/dashboard")
  }

  return children
}
