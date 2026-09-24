export type Kpi = {
  label: string
  value: string
  delta: string
}

export const KPIS: Kpi[] = [
  { label: "Usuários ativos", value: "4.812", delta: "+3,2% vs. mês anterior" },
  { label: "Apoiadores", value: "612", delta: "+11 este mês" },
  { label: "Publicações", value: "1.340", delta: "38 aguardando revisão" },
  { label: "Eventos", value: "27", delta: "4 nos próximos 7 dias" },
  { label: "Arrecadação (set)", value: "R$ 14.820", delta: "+5,0% vs. agosto" },
]

export const KPIS_MODERATOR: Kpi[] = [
  { label: "Usuários ativos", value: "4.812", delta: "+3,2% vs. mês anterior" },
  { label: "Publicações", value: "1.340", delta: "38 aguardando revisão" },
  { label: "Eventos", value: "27", delta: "4 nos próximos 7 dias" },
  { label: "Denúncias abertas", value: "14", delta: "3 críticas" },
  { label: "Resolvidas hoje", value: "7", delta: "+2 vs. ontem" },
]
