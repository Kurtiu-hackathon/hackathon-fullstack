import type { NavGroup } from "./platform-sidebar"

export const DASHBOARD_NAV: NavGroup[] = [
  {
    label: "Painel",
    items: [
      { href: "/dashboard/overview", label: "Visão geral" },
      { href: "/dashboard/events", label: "Eventos" },
      { href: "/dashboard/awards", label: "Prêmios" },
      { href: "/dashboard/forum", label: "Fórum" },
    ],
  },
  {
    label: "Apoio",
    items: [{ href: "https://apoia.se/soujunior", label: "Minha contribuição" }],
  },
  {
    label: "Conta",
    items: [{ href: "/profile", label: "Meu Perfil" }],
  },
]

export const ADMIN_NAV: NavGroup[] = [
  {
    label: "Plataforma",
    items: [
      { href: "/admin/overview", label: "Visão geral" },
      { href: "/admin/users", label: "Usuários" },
      { href: "/admin/posts", label: "Publicações", badge: 38 },
      { href: "/admin/events", label: "Eventos", badge: 4 },
    ],
  },
  {
    label: "Financeiro",
    items: [{ href: "/admin/finance", label: "Doações" }],
  },
  {
    label: "Conta",
    items: [{ href: "/profile", label: "Meu Perfil" }],
  },
]

export const SUPER_ADMIN_NAV: NavGroup[] = [
  {
    label: "Plataforma",
    items: [
      { href: "/super-admin/overview", label: "Visão geral" },
      { href: "/super-admin/users", label: "Usuários" },
      { href: "/super-admin/posts", label: "Publicações", badge: 38 },
      { href: "/super-admin/events", label: "Eventos", badge: 4 },
    ],
  },
  {
    label: "Financeiro",
    items: [{ href: "/super-admin/finance", label: "Doações" }],
  },
  {
    label: "Sistema",
    items: [{ href: "/super-admin/audit", label: "Log de auditoria" }],
  },
  {
    label: "Conta",
    items: [{ href: "/profile", label: "Meu Perfil" }],
  },
]

export const MODERATOR_NAV: NavGroup[] = [
  {
    label: "Plataforma",
    items: [{ href: "/moderator/overview", label: "Visão geral" }],
  },
  {
    label: "Moderação",
    items: [
      { href: "/moderator/posts", label: "Publicações", badge: 38 },
      { href: "/moderator/events", label: "Eventos", badge: 4 },
    ],
  },
  {
    label: "Conta",
    items: [{ href: "/profile", label: "Meu Perfil" }],
  },
]
