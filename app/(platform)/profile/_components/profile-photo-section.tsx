"use client"

import Image from "next/image"

import { cn } from "cn"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import { type PhotoId, PHOTO_IDS, PHOTO_LABELS } from "./profile-types"

type ProfilePhotoSectionProps = {
  value: PhotoId
  onChange: (photo: PhotoId) => void
}

export function ProfilePhotoSection({ value, onChange }: ProfilePhotoSectionProps) {
  return (
    <section aria-labelledby="photo-section-heading">
      <h2 id="photo-section-heading" className="mb-1 font-heading text-lg font-semibold">
        Foto de perfil
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Escolha a foto que representa você
      </p>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <RadioGroup
          value={value}
          onValueChange={(val) => onChange(val as PhotoId)}
          aria-label="Selecionar foto de perfil"
          className="grid grid-cols-3 gap-3"
        >
          {PHOTO_IDS.map((photoId) => (
            <label
              key={photoId}
              className={cn(
                "relative flex cursor-pointer flex-col items-center gap-1.5",
                "outline-2 outline-offset-2 transition-[outline-color]",
                value === photoId
                  ? "outline outline-primary"
                  : "outline-transparent hover:outline-primary/40",
              )}
            >
              <RadioGroupItem value={photoId} className="sr-only" />
              <Image
                src={`/profile-photos/${photoId}.svg`}
                alt={PHOTO_LABELS[photoId]}
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-cover"
              />
              <span className="text-[11px] text-muted-foreground">
                {PHOTO_LABELS[photoId]}
              </span>
            </label>
          ))}
        </RadioGroup>

        <div className="flex shrink-0 flex-col items-center gap-2">
          <Image
            src={`/profile-photos/${value}.svg`}
            alt={`Prévia: ${PHOTO_LABELS[value]}`}
            width={148}
            height={148}
            className="h-[148px] w-[148px] object-cover"
            priority
          />
          <p className="text-[11px] text-muted-foreground">
            Clique numa foto para ver a prévia.
            <br />
            A troca só vale depois de salvar.
          </p>
        </div>
      </div>
    </section>
  )
}
