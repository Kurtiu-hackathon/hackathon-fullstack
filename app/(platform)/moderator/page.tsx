import { createClient } from "@lib/supabase/server"
import { ModeratorContent } from "./_components/moderator-content"
import type { ModeratorSection } from "./_components/moderator-types"

const VALID_SECTIONS = new Set<ModeratorSection>(["overview", "posts", "events"])

type ModeratorPageProps = {
  searchParams: Promise<{ section?: string }>
}

export default async function ModeratorPage({ searchParams }: ModeratorPageProps) {
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

  const { section } = await searchParams
  const initialSection: ModeratorSection =
    section && VALID_SECTIONS.has(section as ModeratorSection)
      ? (section as ModeratorSection)
      : "overview"

  return <ModeratorContent userName={userName} userInitials={userInitials} initialSection={initialSection} />
}
