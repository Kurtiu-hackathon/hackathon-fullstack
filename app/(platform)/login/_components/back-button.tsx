"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";

type BackButtonProps = {
  className?: string;
};

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => router.back()}
      className={cn(
        "min-h-11 gap-2 px-0 text-xs font-semibold tracking-[0.16em] uppercase",
        className,
      )}
    >
      <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
      Voltar
    </Button>
  );
}
