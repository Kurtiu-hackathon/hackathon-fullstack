import { z } from "zod"

export const profileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(32, "O nome deve ter no máximo 32 caracteres."),
  avatarPhoto: z.string().min(1, "Escolha uma foto de perfil."),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
