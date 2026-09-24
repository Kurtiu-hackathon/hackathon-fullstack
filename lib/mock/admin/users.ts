export type UserStatus = "ativo" | "suspenso" | "banido" | "pendente"
export type UserRole = "APOIADOR" | "MODERADOR" | "ADMIN" | "SUPER_ADMIN"

export type MockUser = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinedAt: string
  lastLogin: string
}

export const USERS: MockUser[] = [
  { id: "u1", name: "Ana Carvalho", email: "ana@email.com", role: "SUPER_ADMIN", status: "ativo", joinedAt: "12 jan 2023", lastLogin: "hoje, 14:08" },
  { id: "u2", name: "Bruno Melo", email: "bruno@email.com", role: "ADMIN", status: "ativo", joinedAt: "03 mar 2023", lastLogin: "ontem" },
  { id: "u3", name: "Camila Reis", email: "camila@email.com", role: "MODERADOR", status: "ativo", joinedAt: "17 jun 2023", lastLogin: "23 set" },
  { id: "u4", name: "Diego Souza", email: "diego@email.com", role: "APOIADOR", status: "ativo", joinedAt: "01 ago 2023", lastLogin: "22 set" },
  { id: "u5", name: "Elena Martins", email: "elena@email.com", role: "APOIADOR", status: "suspenso", joinedAt: "15 ago 2023", lastLogin: "10 set" },
  { id: "u6", name: "Felipe Nunes", email: "felipe@email.com", role: "APOIADOR", status: "banido", joinedAt: "20 jul 2023", lastLogin: "05 set" },
  { id: "u7", name: "Gabriela Lima", email: "gabi@email.com", role: "APOIADOR", status: "pendente", joinedAt: "23 set 2023", lastLogin: "—" },
]

export const STATUS_USER_COLORS: Record<UserStatus, string> = {
  ativo: "bg-green-100 text-green-800 border-green-200",
  suspenso: "bg-yellow-100 text-yellow-800 border-yellow-200",
  banido: "bg-red-100 text-red-800 border-red-200",
  pendente: "bg-blue-100 text-blue-800 border-blue-200",
}

export type PermissionRow = {
  label: string
  superAdmin: boolean
  admin: boolean
  moderator: boolean
}

export const PERMISSION_MATRIX: PermissionRow[] = [
  { label: "Ver dados financeiros", superAdmin: true, admin: true, moderator: false },
  { label: "Exportar relatórios", superAdmin: true, admin: true, moderator: false },
  { label: "Gerenciar usuários", superAdmin: true, admin: true, moderator: false },
  { label: "Moderar publicações", superAdmin: true, admin: true, moderator: true },
  { label: "Gerenciar eventos", superAdmin: true, admin: true, moderator: true },
  { label: "Alterar papéis", superAdmin: true, admin: false, moderator: false },
  { label: "Log de auditoria", superAdmin: true, admin: false, moderator: false },
]
