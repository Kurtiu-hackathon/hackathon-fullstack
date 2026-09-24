import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
};

export function BackButton({ className }: BackButtonProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-11 items-center gap-2 px-0 text-xs font-semibold tracking-[0.16em] uppercase",
        className,
      )}
    >
      <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
      Voltar
    </Link>
  );
}
