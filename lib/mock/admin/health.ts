export type HealthStatus = "ok" | "warn" | "error"

export type HealthItem = {
  name: string
  detail: string
  status: HealthStatus
}

export const HEALTH_ITEMS: HealthItem[] = [
  { name: "API principal", detail: "99,98% uptime", status: "ok" },
  { name: "Banco de dados", detail: "12 ms latência", status: "ok" },
  { name: "Fila de e-mail", detail: "2 mensagens pendentes", status: "ok" },
  { name: "Armazenamento de mídia", detail: "78% usado", status: "warn" },
  { name: "Pagamentos (Stripe)", detail: "Operacional", status: "ok" },
]

export const STATUS_COLORS: Record<HealthStatus, string> = {
  ok: "#22c55e",
  warn: "#f59e0b",
  error: "#ef4444",
}
