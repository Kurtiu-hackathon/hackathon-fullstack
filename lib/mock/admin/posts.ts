export type PostStatus = "publicado" | "pendente" | "removido" | "denunciado"

export type MockPost = {
  id: string
  title: string
  author: string
  category: string
  status: PostStatus
  reports: number
  createdAt: string
}

export const POSTS: MockPost[] = [
  { id: "p1", title: "Como criar meu primeiro portfólio", author: "@ana_dev", category: "Carreira", status: "publicado", reports: 0, createdAt: "23 set" },
  { id: "p2", title: "Dicas para entrevistas técnicas", author: "@carlos_ux", category: "Entrevistas", status: "pendente", reports: 0, createdAt: "23 set" },
  { id: "p3", title: "Conteúdo inadequado [spam]", author: "@spammer99", category: "Outros", status: "denunciado", reports: 7, createdAt: "22 set" },
  { id: "p4", title: "Minha jornada como dev júnior", author: "@beatriz_f", category: "Histórias", status: "publicado", reports: 0, createdAt: "21 set" },
  { id: "p5", title: "Ofensas e linguagem imprópria", author: "@usuario_xyz", category: "Outros", status: "removido", reports: 12, createdAt: "20 set" },
  { id: "p6", title: "React 19 — novidades que você precisa saber", author: "@rafael_js", category: "Tecnologia", status: "pendente", reports: 0, createdAt: "19 set" },
]

export const STATUS_POST_COLORS: Record<PostStatus, string> = {
  publicado: "bg-green-100 text-green-800 border-green-200",
  pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  removido: "bg-red-100 text-red-800 border-red-200",
  denunciado: "bg-orange-100 text-orange-800 border-orange-200",
}
