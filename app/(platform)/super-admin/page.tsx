import { createClient } from "@lib/supabase/server"
import { SuperAdminContent } from "./_components/super-admin-content"

export default async function SuperAdminPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const fullName = data.user?.user_metadata?.full_name as string | undefined
  const email = data.user?.email ?? ""
  const userName = fullName ?? email.split("@")[0] ?? "Super Admin"
  const userInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")

  return <SuperAdminContent userName={userName} userInitials={userInitials} />
}
