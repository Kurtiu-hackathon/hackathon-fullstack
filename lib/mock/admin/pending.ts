export type PendingItem = {
  label: string
  count: number
  section: string
}

export const PENDING_ITEMS_ADMIN: PendingItem[] = [
  { label: "Publicações aguardando revisão", count: 38, section: "posts" },
  { label: "Eventos para aprovar", count: 4, section: "events" },
  { label: "Usuários com denúncia", count: 9, section: "users" },
  { label: "Transferências pendentes", count: 2, section: "finance" },
]

export const PENDING_ITEMS_MODERATOR: PendingItem[] = [
  { label: "Publicações aguardando revisão", count: 38, section: "posts" },
  { label: "Eventos para aprovar", count: 4, section: "events" },
  { label: "Denúncias abertas", count: 14, section: "posts" },
  { label: "Comentários reportados", count: 6, section: "posts" },
]
