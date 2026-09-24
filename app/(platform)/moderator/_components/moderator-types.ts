export type ModeratorSection = "overview" | "posts" | "events"

export const SECTION_TITLES: Record<ModeratorSection, string> = {
  overview: "Visão geral",
  posts: "Publicações",
  events: "Eventos",
}

export const SECTION_GROUPS: Record<ModeratorSection, string> = {
  overview: "Plataforma",
  posts: "Moderação",
  events: "Moderação",
}

export type NavItem = {
  id: ModeratorSection
  label: string
  badge?: number
}

export const NAV_PLATAFORMA: NavItem[] = [
  { id: "overview", label: "Visão geral" },
]

export const NAV_MODERACAO: NavItem[] = [
  { id: "posts", label: "Publicações", badge: 38 },
  { id: "events", label: "Eventos", badge: 4 },
]
