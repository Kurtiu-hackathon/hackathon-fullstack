import { redirect } from "next/navigation"

import { createClient } from "@lib/supabase/server"

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

  return children
}
