export type AdminSection = "overview" | "users" | "posts" | "events" | "finance"

export const SECTION_TITLES: Record<AdminSection, string> = {
  overview: "Visão geral",
  users: "Usuários",
  posts: "Publicações",
  events: "Eventos",
  finance: "Doações",
}

export const SECTION_GROUPS: Record<AdminSection, string> = {
  overview: "Plataforma",
  users: "Plataforma",
  posts: "Plataforma",
  events: "Plataforma",
  finance: "Financeiro",
}

export type NavItem = {
  id: AdminSection
  label: string
  badge?: number
}

export const NAV_PLATAFORMA: NavItem[] = [
  { id: "overview", label: "Visão geral" },
  { id: "users", label: "Usuários" },
  { id: "posts", label: "Publicações", badge: 38 },
  { id: "events", label: "Eventos", badge: 4 },
]

export const NAV_FINANCEIRO: NavItem[] = [
  { id: "finance", label: "Doações" },
]
