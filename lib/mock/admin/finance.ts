export type DonationStatus = "aprovado" | "pendente" | "estornado" | "falhou"

export type MockDonation = {
  id: string
  donor: string
  email: string
  amount: string
  tier: string
  status: DonationStatus
  date: string
  method: string
}

export const DONATIONS: MockDonation[] = [
  { id: "d1", donor: "Marina Lopes", email: "marina@email.com", amount: "R$ 50,00", tier: "Colaborador", status: "aprovado", date: "23 set 2024", method: "Cartão" },
  { id: "d2", donor: "Pedro Alves", email: "pedro@email.com", amount: "R$ 25,00", tier: "Apoiador", status: "aprovado", date: "22 set 2024", method: "PIX" },
  { id: "d3", donor: "Sofia Costa", email: "sofia@email.com", amount: "R$ 100,00", tier: "Parceiro", status: "pendente", date: "23 set 2024", method: "Boleto" },
  { id: "d4", donor: "Thiago Neto", email: "thiago@email.com", amount: "R$ 25,00", tier: "Apoiador", status: "estornado", date: "18 set 2024", method: "Cartão" },
  { id: "d5", donor: "Valentina Cruz", email: "val@email.com", amount: "R$ 200,00", tier: "Patrono", status: "aprovado", date: "17 set 2024", method: "Cartão" },
  { id: "d6", donor: "Wagner Lima", email: "wagner@email.com", amount: "R$ 25,00", tier: "Apoiador", status: "falhou", date: "15 set 2024", method: "Cartão" },
]

export const STATUS_DONATION_COLORS: Record<DonationStatus, string> = {
  aprovado: "bg-green-100 text-green-800 border-green-200",
  pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  estornado: "bg-orange-100 text-orange-800 border-orange-200",
  falhou: "bg-red-100 text-red-800 border-red-200",
}
