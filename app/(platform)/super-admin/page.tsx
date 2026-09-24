import { createClient } from "@lib/supabase/server"
import { SuperAdminContent } from "./_components/super-admin-content"
import type { SuperAdminSection } from "./_components/super-admin-types"

const VALID_SECTIONS = new Set<SuperAdminSection>(["overview", "users", "posts", "events", "finance", "audit"])

type SuperAdminPageProps = {
  searchParams: Promise<{ section?: string }>
}

export default async function SuperAdminPage({ searchParams }: SuperAdminPageProps) {
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

  const { section } = await searchParams
  const initialSection: SuperAdminSection =
    section && VALID_SECTIONS.has(section as SuperAdminSection)
      ? (section as SuperAdminSection)
      : "overview"

  return <SuperAdminContent userName={userName} userInitials={userInitials} initialSection={initialSection} />
}
