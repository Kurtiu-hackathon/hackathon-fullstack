import { DashboardContent } from "./_components/dashboard-content"
import type { ActiveSection } from "./_components/dashboard-types"

const VALID_SECTIONS = new Set<ActiveSection>(["overview", "events", "awards", "forum"])

type DashboardPageProps = {
  searchParams: Promise<{ section?: string }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { section } = await searchParams
  const initialSection: ActiveSection =
    section && VALID_SECTIONS.has(section as ActiveSection)
      ? (section as ActiveSection)
      : "overview"

  return <DashboardContent initialSection={initialSection} />
}
