import { redirect } from "next/navigation"

import { createClient } from "@lib/supabase/server"

type SuperAdminLayoutProps = {
  children: React.ReactNode
}

export default async function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  const role = data?.claims?.app_metadata?.role as string | undefined

  if (error || role !== "SUPER_ADMIN") {
    redirect("/dashboard")
  }

  return children
}
