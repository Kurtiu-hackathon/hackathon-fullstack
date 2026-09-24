import { createClient } from "@lib/supabase/server"
import { AdminContent } from "./_components/admin-content"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const fullName = data.user?.user_metadata?.full_name as string | undefined
  const email = data.user?.email ?? ""
  const userName = fullName ?? email.split("@")[0] ?? "Admin"
  const userInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")

  return <AdminContent userName={userName} userInitials={userInitials} />
}
