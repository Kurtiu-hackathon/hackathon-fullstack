export const dashboardStats = [
  {
    value: "18",
    label: "MESES DE APOIO",
  },
  {
    value: "R$ 450",
    label: "TOTAL CONTRIBUÍDO",
    highlighted: true,
  },
  {
    value: "6",
    label: "PRÊMIOS RECEBIDOS",
  },
  {
    value: "9",
    label: "MENTORIAS BANCADAS",
  },
] as const

export const supportTrack = {
  current: 18,
  total: 24,
  level: "Fundador",
} as const

export const monthlyGoal = {
  label: "META DE JUNHO",
  current: "R$ 3.480",
  target: "R$ 5.000",
  progress: 70,
} as const