"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Blueprint } from "@/components/ui/blueprint"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()

  const displayPath =
    pathname && pathname.length > 32
      ? pathname.slice(0, 30) + "…"
      : (pathname ?? "/")

  return (
    <div
      className="flex min-h-screen flex-col bg-navy"
      style={
        {
          backgroundImage:
            "linear-gradient(color-mix(in srgb,var(--primary) 8%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--primary) 8%,transparent) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          "--color-text": "#e8e9ea",
          "--color-accent": "#3c7ef9",
          "--primary": "#3c7ef9",
          "--primary-foreground": "#0b1220",
          "--border": "rgba(255,255,255,0.12)",
        } as React.CSSProperties
      }
    >
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-10">
        <Link href="/" aria-label="SouJunior - início">
          <Image
            src="/icos/logo-white.svg"
            alt="SouJunior"
            width={275}
            height={104}
            priority
            className="h-auto w-32"
          />
        </Link>
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Erro 404
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-start gap-12 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <div className="flex flex-1 flex-col gap-7">
          <div className="flex items-center gap-2.5">
            <span className="size-2 shrink-0 bg-primary" aria-hidden="true" />
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Página não encontrada
            </span>
          </div>

          <h1 className="font-heading text-5xl font-bold leading-[1.08] text-white lg:text-6xl">
            Essa rota ainda não foi construída.
          </h1>

          <p className="max-w-[44ch] text-[15px] leading-relaxed text-white/55">
            O link pode estar quebrado, o endereço mudou de lugar, ou a página
            nunca existiu. Nada aqui é culpa sua — volta pro começo e segue o
            fluxo.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="uppercase tracking-[0.08em]" nativeButton={false} render={<Link href="/" />}>
              Ir para a home
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white uppercase tracking-[0.08em] hover:bg-white/10 active:bg-white/15"
              style={{ borderColor: "rgba(255,255,255,0.28)" }}
              onClick={() => router.back()}
            >
              Voltar
            </Button>
          </div>
        </div>

        <Blueprint className="hidden w-full max-w-sm shrink-0 lg:block">
          <div className="flex items-center justify-center px-10 py-12">
            <span className="font-heading text-[9rem] font-bold leading-none text-primary xl:text-[11rem]">
              404
            </span>
          </div>

          <div className="border-t border-white/12" />

          <div className="flex flex-col divide-y divide-white/10">
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Status
              </span>
              <span className="font-heading text-sm font-semibold text-white">
                Not Found
              </span>
            </div>
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Rota
              </span>
              <span className="font-mono text-xs font-semibold text-white/70">
                {displayPath}
              </span>
            </div>
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Código
              </span>
              <span className="font-heading text-sm font-semibold text-white">
                404
              </span>
            </div>
          </div>
        </Blueprint>
      </main>

      <footer className="flex items-center justify-between border-t border-white/10 px-6 py-5 lg:px-10">
        <span className="text-xs text-white/35">
          SouJunior — comunidade voluntária de tecnologia
        </span>
        <a
          href="#"
          className="text-xs text-primary hover:opacity-70"
        >
          Falar com o time no Discord
        </a>
      </footer>
    </div>
  )
}
