export type ChartBar = {
  label: string
  value: number
  current?: boolean
}

export const CHART_BARS: ChartBar[] = [
  { label: "Out", value: 9200 },
  { label: "Nov", value: 10400 },
  { label: "Dez", value: 11800 },
  { label: "Jan", value: 10100 },
  { label: "Fev", value: 9600 },
  { label: "Mar", value: 10900 },
  { label: "Abr", value: 11200 },
  { label: "Mai", value: 12400 },
  { label: "Jun", value: 13100 },
  { label: "Jul", value: 13800 },
  { label: "Ago", value: 14110 },
  { label: "Set", value: 14820, current: true },
]

const MAX = Math.max(...CHART_BARS.map((b) => b.value))

export const CHART_BARS_NORMALIZED = CHART_BARS.map((b) => ({
  ...b,
  height: `${Math.round((b.value / MAX) * 100)}%`,
}))
