import { createClient } from "@lib/supabase/server"
import { AdminContent } from "./_components/admin-content"
import type { AdminSection } from "./_components/admin-types"

const VALID_SECTIONS = new Set<AdminSection>(["overview", "users", "posts", "events", "finance"])

type AdminPageProps = {
  searchParams: Promise<{ section?: string }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
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

  const { section } = await searchParams
  const initialSection: AdminSection =
    section && VALID_SECTIONS.has(section as AdminSection)
      ? (section as AdminSection)
      : "overview"

  return <AdminContent userName={userName} userInitials={userInitials} initialSection={initialSection} />
}
