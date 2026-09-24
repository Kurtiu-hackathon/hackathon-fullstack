"use server"

import type { User } from "@supabase/supabase-js"

import { createClient } from "@lib/supabase/server"
import { createAdminClient } from "@lib/supabase/admin"
import {
  updateRoleSchema,
  banUserSchema,
  type UserRole,
} from "@lib/validations/admin"

export type UserStatus = "ativo" | "suspenso" | "banido" | "pendente"

export type AdminUser = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinedAt: string
  lastLogin: string
}

type ActionResult<T = undefined> =
  | { status: "success"; message: string; data?: T }
  | { status: "error"; message: string }

type PaginatedUsers = {
  users: AdminUser[]
  total: number
  page: number
  lastPage: number
}

type ListUsersOptions = {
  page?: number
  perPage?: number
  search?: string
  status?: UserStatus | "todos"
}

function mapUser(user: User): AdminUser {
  return {
    id: user.id,
    name: (user.user_metadata?.display_name as string | undefined) ?? "",
    email: user.email ?? "",
    role: ((user.app_metadata?.role as string | undefined) ?? "USER") as UserRole,
    status: ((user.app_metadata?.status as string | undefined) ?? "ativo") as UserStatus,
    joinedAt: user.created_at,
    lastLogin: user.last_sign_in_at ?? "",
  }
}

async function getCallerClaims() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) return null
  return {
    role: (data.claims.app_metadata?.role as UserRole | undefined) ?? null,
    id: (data.claims.sub as string | undefined) ?? null,
  }
}

export async function listUsers(
  options: ListUsersOptions = {},
): Promise<ActionResult<PaginatedUsers>> {
  const caller = await getCallerClaims()
  if (!caller?.role || (caller.role !== "ADMIN" && caller.role !== "SUPER_ADMIN")) {
    return { status: "error", message: "Acesso não autorizado." }
  }

  const { page = 1, perPage = 50, search = "", status = "todos" } = options
  const adminClient = createAdminClient()
  const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage })

  if (error) {
    return { status: "error", message: "Não foi possível carregar os usuários." }
  }

  // Auth has no search endpoint: scan every page before applying filters.
  const filtering = search.trim() !== "" || status !== "todos"
  let allUsers = data.users
  if (filtering) {
    for (let next = page + 1; next <= data.lastPage; next++) {
      const result = await adminClient.auth.admin.listUsers({ page: next, perPage })
      if (result.error) {
        return { status: "error", message: "Não foi possível carregar os usuários." }
      }
      allUsers = [...allUsers, ...result.data.users]
    }
  }
  let users = allUsers.map(mapUser)

  if (search.trim()) {
    const q = search.trim().toLowerCase()
    users = users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    )
  }

  if (status !== "todos") {
    users = users.filter((u) => u.status === status)
  }

  return {
    status: "success",
    message: "Usuários carregados com sucesso.",
    data: {
      users,
      total: data.total,
      page,
      lastPage: data.lastPage,
    },
  }
}

export async function getUserById(userId: string): Promise<ActionResult<AdminUser>> {
  const caller = await getCallerClaims()
  if (!caller?.role || (caller.role !== "ADMIN" && caller.role !== "SUPER_ADMIN")) {
    return { status: "error", message: "Acesso não autorizado." }
  }

  const parsed = banUserSchema.safeParse({ userId })
  if (!parsed.success) {
    return { status: "error", message: "ID de usuário inválido." }
  }

  const adminClient = createAdminClient()
  const { data, error } = await adminClient.auth.admin.getUserById(userId)

  if (error) {
    return { status: "error", message: "Usuário não encontrado." }
  }

  return {
    status: "success",
    message: "Usuário carregado.",
    data: mapUser(data.user),
  }
}

export async function banUser(userId: string): Promise<ActionResult> {
  const parsed = banUserSchema.safeParse({ userId })
  if (!parsed.success) {
    return { status: "error", message: "ID de usuário inválido." }
  }

  const caller = await getCallerClaims()
  if (!caller?.role || (caller.role !== "ADMIN" && caller.role !== "SUPER_ADMIN")) {
    return { status: "error", message: "Acesso não autorizado." }
  }

  if (caller.id === userId) {
    return { status: "error", message: "Você não pode banir sua própria conta." }
  }

  const adminClient = createAdminClient()
  const { data: targetData, error: fetchError } =
    await adminClient.auth.admin.getUserById(userId)

  if (fetchError) {
    return { status: "error", message: "Usuário não encontrado." }
  }

  const targetRole =
    (targetData.user.app_metadata?.role as UserRole | undefined) ?? "USER"

  if (caller.role === "ADMIN" && targetRole === "SUPER_ADMIN") {
    return { status: "error", message: "Admins não podem banir Super Admins." }
  }

  if (targetData.user.app_metadata?.status === "banido") {
    return { status: "error", message: "Este usuário já está banido." }
  }

  const { error } = await adminClient.auth.admin.updateUserById(userId, {
    ban_duration: "87600h",
    app_metadata: { ...targetData.user.app_metadata, status: "banido" },
  })

  if (error) {
    return { status: "error", message: "Não foi possível banir o usuário." }
  }

  return { status: "success", message: "Usuário banido com sucesso." }
}

export async function unbanUser(userId: string): Promise<ActionResult> {
  const parsed = banUserSchema.safeParse({ userId })
  if (!parsed.success) {
    return { status: "error", message: "ID de usuário inválido." }
  }

  const caller = await getCallerClaims()
  if (!caller?.role || (caller.role !== "ADMIN" && caller.role !== "SUPER_ADMIN")) {
    return { status: "error", message: "Acesso não autorizado." }
  }

  const adminClient = createAdminClient()
  const { data: targetData, error: fetchError } =
    await adminClient.auth.admin.getUserById(userId)

  if (fetchError) {
    return { status: "error", message: "Usuário não encontrado." }
  }

  const targetRole =
    (targetData.user.app_metadata?.role as UserRole | undefined) ?? "USER"

  if (caller.role === "ADMIN" && targetRole === "SUPER_ADMIN") {
    return { status: "error", message: "Admins não podem modificar Super Admins." }
  }

  if (targetData.user.app_metadata?.status !== "banido") {
    return { status: "error", message: "Este usuário não está banido." }
  }

  const { error } = await adminClient.auth.admin.updateUserById(userId, {
    ban_duration: "none",
    app_metadata: { ...targetData.user.app_metadata, status: "ativo" },
  })

  if (error) {
    return { status: "error", message: "Não foi possível remover o banimento." }
  }

  return { status: "success", message: "Banimento removido com sucesso." }
}

export async function updateUserRole(
  userId: string,
  newRole: UserRole,
): Promise<ActionResult> {
  const parsed = updateRoleSchema.safeParse({ userId, newRole })
  if (!parsed.success) {
    return { status: "error", message: "Dados inválidos." }
  }

  const caller = await getCallerClaims()
  if (!caller?.role || (caller.role !== "ADMIN" && caller.role !== "SUPER_ADMIN")) {
    return { status: "error", message: "Acesso não autorizado." }
  }

  if (caller.id === userId) {
    return { status: "error", message: "Você não pode alterar seu próprio papel." }
  }

  const adminClient = createAdminClient()
  const { data: targetData, error: fetchError } =
    await adminClient.auth.admin.getUserById(userId)

  if (fetchError) {
    return { status: "error", message: "Usuário não encontrado." }
  }

  const targetRole =
    (targetData.user.app_metadata?.role as UserRole | undefined) ?? "USER"

  if (caller.role === "ADMIN") {
    if (targetRole !== "USER" || newRole !== "MODERATOR") {
      return {
        status: "error",
        message: "Admins só podem promover usuários comuns para Moderador.",
      }
    }
  }

  if (targetRole === newRole) {
    return { status: "error", message: "O usuário já possui este papel." }
  }

  const { error } = await adminClient.auth.admin.updateUserById(userId, {
    app_metadata: { ...targetData.user.app_metadata, role: newRole },
  })

  if (error) {
    return { status: "error", message: "Não foi possível alterar o papel do usuário." }
  }

  return { status: "success", message: "Papel atualizado com sucesso." }
}
