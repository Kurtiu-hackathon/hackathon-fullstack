import type { Metadata } from "next"

import { createClient } from "@lib/supabase/server"
import { type PhotoId, type IdentityItem, type IdentityProvider } from "./_components/profile-types"
import { ProfileContent } from "./_components/profile-content"

export const metadata: Metadata = {
  title: "Meu perfil",
  robots: { index: false },
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: userData } = await supabase.auth.getUser()
  const { data: identitiesData } = await supabase.auth.getUserIdentities()

  const user = userData?.user
  const email = user?.email ?? ""
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>

  const initialDisplayName: string =
    (meta.display_name as string | undefined) ??
    (meta.full_name as string | undefined) ??
    email.split("@")[0] ??
    ""

  const initialAvatarPhoto: PhotoId =
    (meta.avatar_photo as PhotoId | undefined) ?? "aria-profile-girl"

  const identities: IdentityItem[] = (identitiesData?.identities ?? [])
    .filter((i) => i.provider !== "email")
    .map((i) => ({
      identityId: i.identity_id,
      provider: i.provider as IdentityProvider,
      createdAt: i.created_at ?? new Date().toISOString(),
    }))

  return (
    <ProfileContent
      initialDisplayName={initialDisplayName}
      initialAvatarPhoto={initialAvatarPhoto}
      identities={identities}
    />
  )
}
