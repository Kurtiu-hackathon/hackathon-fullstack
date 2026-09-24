export type ActivityItem = {
  actor: string
  action: string
  target: string
  when: string
}

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { actor: "Carlos M.", action: "baniu", target: "usuário @spammer99", when: "há 8 min" },
  { actor: "Admin", action: "aprovou", target: "evento Hackathon SP 2024", when: "há 22 min" },
  { actor: "Beatriz L.", action: "removeu publicação de", target: "@usuario_xyz", when: "há 1h" },
  { actor: "Admin", action: "exportou relatório", target: "doações · setembro", when: "há 2h" },
  { actor: "Rafael T.", action: "alterou papel de", target: "@novo_mod para Moderador", when: "há 3h" },
]
