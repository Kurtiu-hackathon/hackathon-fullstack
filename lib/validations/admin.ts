import { z } from "zod"

export const USER_ROLES = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"] as const
export type UserRole = (typeof USER_ROLES)[number]

export const updateRoleSchema = z.object({
  userId: z.string().uuid("ID de usuário inválido."),
  newRole: z.enum(USER_ROLES, "Papel inválido."),
})
export type UpdateRoleValues = z.infer<typeof updateRoleSchema>

export const banUserSchema = z.object({
  userId: z.string().uuid("ID de usuário inválido."),
})
export type BanUserValues = z.infer<typeof banUserSchema>
