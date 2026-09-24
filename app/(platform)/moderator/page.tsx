import { createClient } from "@lib/supabase/server"
import { ModeratorContent } from "./_components/moderator-content"

export default async function ModeratorPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const fullName = data.user?.user_metadata?.full_name as string | undefined
  const email = data.user?.email ?? ""
  const userName = fullName ?? email.split("@")[0] ?? "Moderador"
  const userInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")

  return <ModeratorContent userName={userName} userInitials={userInitials} />
}
