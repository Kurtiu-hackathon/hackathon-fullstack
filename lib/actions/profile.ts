"use server"

import { headers } from "next/headers"

import { buildAuthCallbackUrl } from "@lib/auth/safe-redirect"
import { getAuthErrorMessage } from "@lib/auth/error-message"
import { createClient } from "@lib/supabase/server"
import { profileSchema, type ProfileFormValues } from "@lib/validations/profile"

type ProfileActionResult =
  | { status: "success"; message: string }
  | { status: "error"; message: string }

type LinkIdentityResult =
  | { status: "redirect"; url: string }
  | { status: "error"; message: string }

async function getRequestOrigin(): Promise<string> {
  const requestHeaders = await headers()
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")

  if (!host) {
    throw new Error("Não foi possível determinar a URL da aplicação.")
  }

  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http"
  return `${protocol}://${host}`
}

export async function updateProfile(
  values: ProfileFormValues,
): Promise<ProfileActionResult> {
  const parsedValues = profileSchema.safeParse(values)

  if (!parsedValues.success) {
    return { status: "error", message: "Verifique os dados informados." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    data: {
      display_name: parsedValues.data.displayName,
      avatar_photo: parsedValues.data.avatarPhoto,
    },
  })

  if (error) {
    return { status: "error", message: getAuthErrorMessage(error) }
  }

  return { status: "success", message: "Perfil atualizado com sucesso." }
}

export async function disconnectIdentity(
  identityId: string,
): Promise<ProfileActionResult> {
  const supabase = await createClient()
  const { data, error: fetchError } = await supabase.auth.getUserIdentities()

  if (fetchError || !data) {
    return { status: "error", message: "Não foi possível carregar as contas conectadas." }
  }

  const identity = data.identities.find((i) => i.identity_id === identityId)

  if (!identity) {
    return { status: "error", message: "Conta não encontrada." }
  }

  const { error } = await supabase.auth.unlinkIdentity(identity)

  if (error) {
    return { status: "error", message: getAuthErrorMessage(error) }
  }

  return { status: "success", message: "Conta desconectada com sucesso." }
}

export async function linkGoogleIdentity(): Promise<LinkIdentityResult> {
  const supabase = await createClient()
  const origin = await getRequestOrigin()

  const { data, error } = await supabase.auth.linkIdentity({
    provider: "google",
    options: {
      redirectTo: buildAuthCallbackUrl(origin, "/profile"),
    },
  })

  if (error || !data.url) {
    return {
      status: "error",
      message: error
        ? getAuthErrorMessage(error)
        : "Não foi possível iniciar a conexão com Google.",
    }
  }

  return { status: "redirect", url: data.url }
}

export async function linkDiscordIdentity(): Promise<LinkIdentityResult> {
  const supabase = await createClient()
  const origin = await getRequestOrigin()

  const { data, error } = await supabase.auth.linkIdentity({
    provider: "discord",
    options: {
      redirectTo: buildAuthCallbackUrl(origin, "/profile"),
    },
  })

  if (error || !data.url) {
    return {
      status: "error",
      message: error
        ? getAuthErrorMessage(error)
        : "Não foi possível iniciar a conexão com Discord.",
    }
  }

  return { status: "redirect", url: data.url }
}
