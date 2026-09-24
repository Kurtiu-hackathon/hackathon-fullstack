export type EventStatus = "aprovado" | "pendente" | "cancelado" | "encerrado"

export type MockEvent = {
  id: string
  name: string
  organizer: string
  date: string
  location: string
  status: EventStatus
  attendees: number
}

export const EVENTS: MockEvent[] = [
  { id: "e1", name: "Hackathon SP 2024", organizer: "@tech_sp", date: "15 out 2024", location: "São Paulo, SP", status: "aprovado", attendees: 140 },
  { id: "e2", name: "Workshop de UX para devs", organizer: "@ux_rio", date: "28 out 2024", location: "Online", status: "pendente", attendees: 0 },
  { id: "e3", name: "Meetup Next.js", organizer: "@nextjs_brasil", date: "02 nov 2024", location: "Online", status: "aprovado", attendees: 87 },
  { id: "e4", name: "Bootcamp de Entrevistas", organizer: "@junior_dev", date: "10 set 2024", location: "Online", status: "encerrado", attendees: 212 },
  { id: "e5", name: "DevFest Recife", organizer: "@gdg_recife", date: "18 set 2024", location: "Recife, PE", status: "cancelado", attendees: 0 },
]

export const STATUS_EVENT_COLORS: Record<EventStatus, string> = {
  aprovado: "bg-green-100 text-green-800 border-green-200",
  pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancelado: "bg-red-100 text-red-800 border-red-200",
  encerrado: "bg-neutral-100 text-neutral-600 border-neutral-200",
}
