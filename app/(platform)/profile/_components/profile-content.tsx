"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Toaster, toast } from "@components/ui/toast"
import { Separator } from "@components/ui/separator"
import { profileSchema, type ProfileFormValues } from "@lib/validations/profile"
import {
  updateProfile,
  disconnectIdentity,
  linkGoogleIdentity,
  linkDiscordIdentity,
} from "@lib/actions/profile"
import { type PhotoId, type IdentityItem } from "./profile-types"
import { ProfilePhotoSection } from "./profile-photo-section"
import { ProfileNameSection } from "./profile-name-section"
import { ProfileConnectedSection } from "./profile-connected-section"
import { ProfileStickyFooter } from "./profile-sticky-footer"

type ProfileContentProps = {
  initialDisplayName: string
  initialAvatarPhoto: PhotoId
  identities: IdentityItem[]
}

export function ProfileContent({
  initialDisplayName,
  initialAvatarPhoto,
  identities: initialIdentities,
}: ProfileContentProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [currentPhoto, setCurrentPhoto] = useState<PhotoId>(initialAvatarPhoto)
  const [identities, setIdentities] = useState<IdentityItem[]>(initialIdentities)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: initialDisplayName,
      avatarPhoto: initialAvatarPhoto,
    },
  })

  const { isDirty, isValid } = form.formState

  function handlePhotoChange(photo: PhotoId) {
    setCurrentPhoto(photo)
    form.setValue("avatarPhoto", photo, { shouldDirty: true, shouldValidate: true })
  }

  function handleDiscard() {
    form.reset()
    setCurrentPhoto(initialAvatarPhoto)
  }

  function handleSubmit(values: ProfileFormValues) {
    startTransition(async () => {
      const result = await updateProfile(values)
      if (result.status === "error") {
        toast.add({ title: result.message, type: "error" })
        return
      }
      form.reset(values)
      toast.add({ title: result.message, type: "success" })
      router.refresh()
    })
  }

  async function handleDisconnect(identityId: string) {
    startTransition(async () => {
      const result = await disconnectIdentity(identityId)
      if (result.status === "error") {
        toast.add({ title: result.message, type: "error" })
        return
      }
      setIdentities((prev) => prev.filter((i) => i.identityId !== identityId))
      toast.add({ title: result.message, type: "success" })
      router.refresh()
    })
  }

  async function handleLinkGoogle() {
    startTransition(async () => {
      const result = await linkGoogleIdentity()
      if (result.status === "error") {
        toast.add({ title: result.message, type: "error" })
        return
      }
      window.location.assign(result.url)
    })
  }

  async function handleLinkDiscord() {
    startTransition(async () => {
      const result = await linkDiscordIdentity()
      if (result.status === "error") {
        toast.add({ title: result.message, type: "error" })
        return
      }
      window.location.assign(result.url)
    })
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div className="mx-auto max-w-2xl space-y-10 px-6 py-8">
          <ProfilePhotoSection value={currentPhoto} onChange={handlePhotoChange} />
          <Separator />
          <ProfileNameSection control={form.control} currentPhoto={currentPhoto} />
          <Separator />
          <ProfileConnectedSection
            identities={identities}
            onDisconnect={handleDisconnect}
            onLinkGoogle={handleLinkGoogle}
            onLinkDiscord={handleLinkDiscord}
            isPending={isPending}
          />
        </div>
        <ProfileStickyFooter
          isDirty={isDirty}
          isValid={isValid}
          isPending={isPending}
          onDiscard={handleDiscard}
        />
      </form>
      <Toaster />
    </>
  )
}
