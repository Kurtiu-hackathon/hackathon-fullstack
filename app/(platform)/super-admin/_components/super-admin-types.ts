export type SuperAdminSection =
  | "overview"
  | "users"
  | "posts"
  | "events"
  | "finance"
  | "audit"

export const SECTION_TITLES: Record<SuperAdminSection, string> = {
  overview: "Visão geral",
  users: "Usuários",
  posts: "Publicações",
  events: "Eventos",
  finance: "Doações",
  audit: "Log de auditoria",
}

export const SECTION_GROUPS: Record<SuperAdminSection, string> = {
  overview: "Plataforma",
  users: "Plataforma",
  posts: "Plataforma",
  events: "Plataforma",
  finance: "Financeiro",
  audit: "Sistema",
}

export type NavItem = {
  id: SuperAdminSection
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

export const NAV_SISTEMA: NavItem[] = [
  { id: "audit", label: "Log de auditoria" },
]
