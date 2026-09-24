"use client"

import { cn } from "cn"

import { Button } from "@components/ui/button"

type ProfileStickyFooterProps = {
  isDirty: boolean
  isValid: boolean
  isPending: boolean
  onDiscard: () => void
}

export function ProfileStickyFooter({
  isDirty,
  isValid,
  isPending,
  onDiscard,
}: ProfileStickyFooterProps) {
  return (
    <div
      aria-hidden={!isDirty}
      className={cn(
        "sticky bottom-0 z-30 border-t border-border bg-background transition-transform duration-200",
        isDirty ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-end gap-3 px-6 py-4">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={onDiscard}
        >
          Descartar
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isPending}
        >
          Salvar alterações
        </Button>
      </div>
    </div>
  )
}
