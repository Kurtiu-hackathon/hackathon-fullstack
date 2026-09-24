export type Tier = {
  name: string
  count: number
  share: number
}

export const TIERS: Tier[] = [
  { name: "Apoiador", count: 312, share: 51 },
  { name: "Colaborador", count: 184, share: 30 },
  { name: "Parceiro", count: 89, share: 15 },
  { name: "Patrono", count: 27, share: 4 },
]
