"use client"

import Image from "next/image"
import { type Control, Controller, useFormState } from "react-hook-form"

import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Card, CardContent } from "@components/ui/card"
import { type ProfileFormValues } from "@lib/validations/profile"
import { type PhotoId, PHOTO_LABELS } from "./profile-types"

type ProfileNameSectionProps = {
  control: Control<ProfileFormValues>
  currentPhoto: PhotoId
}

export function ProfileNameSection({ control, currentPhoto }: ProfileNameSectionProps) {
  const { errors } = useFormState({ control, name: "displayName" })

  return (
    <section aria-labelledby="name-section-heading">
      <h2 id="name-section-heading" className="mb-1 font-heading text-lg font-semibold">
        Nome de perfil
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Nome exibido no fórum e nos eventos
      </p>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-1 flex-col gap-2">
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="display-name">Nome</Label>
                <Input
                  id="display-name"
                  {...field}
                  maxLength={32}
                  placeholder="Como quer ser chamada(o)"
                  aria-invalid={!!errors.displayName}
                  aria-describedby={
                    errors.displayName ? "display-name-error display-name-hint" : "display-name-hint"
                  }
                />
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    {errors.displayName && (
                      <p id="display-name-error" className="text-xs text-destructive" role="alert">
                        {errors.displayName.message}
                      </p>
                    )}
                    <p id="display-name-hint" className="text-xs text-muted-foreground">
                      Pode ser apelido. Evite dados sensíveis.
                    </p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {field.value.length}/32
                  </span>
                </div>
              </div>
            )}
          />
        </div>

        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <Card className="w-full sm:w-52">
              <CardContent className="flex items-center gap-3 p-4">
                <Image
                  src={`/profile-photos/${currentPhoto}.svg`}
                  alt={PHOTO_LABELS[currentPhoto]}
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {field.value || "Seu nome aqui"}
                  </p>
                  <p className="text-xs text-muted-foreground">Prévia do perfil</p>
                </div>
              </CardContent>
            </Card>
          )}
        />
      </div>
    </section>
  )
}
