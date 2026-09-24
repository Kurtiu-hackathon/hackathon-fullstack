"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Blueprint } from "@components/ui/blueprint"
import { Button } from "@components/ui/button"

export default function Unauthorized() {
  const pathname = usePathname()

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
          Erro 401
        </span>
      </header>

      <main id="main-content" className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-start gap-12 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <div className="flex flex-1 flex-col gap-7">
          <div className="flex items-center gap-2.5">
            <span className="size-2 shrink-0 animate-pulse bg-primary" aria-hidden="true" />
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Acesso restrito
            </span>
          </div>

          <h1 className="font-heading text-5xl font-bold leading-[1.08] text-white lg:text-6xl">
            Você precisa entrar para ver isso.
          </h1>

          <p className="max-w-[44ch] text-[15px] leading-relaxed text-white/55">
            Essa área é do painel de apoiadores. Sua sessão expirou ou você
            ainda não entrou. Faz login e você volta exatamente pra onde estava.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="uppercase tracking-[0.08em]" nativeButton={false} render={<Link href="/login" />}>
              Entrar na conta
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white uppercase tracking-[0.08em] hover:bg-white/10 active:bg-white/15"
              style={{ borderColor: "rgba(255,255,255,0.28)" }}
              nativeButton={false}
              render={<Link href="/" />}
            >
              Ir para a home
            </Button>
          </div>

          <div className="border-t border-white/10" />

          <div className="flex flex-col gap-3">
            <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
              Sem acesso ainda?
            </span>
            <p className="max-w-[52ch] text-[14px] leading-relaxed text-white/55">
              O painel é aberto pra quem apoia a partir de R$ 2 por mês e pra
              voluntários ativos.{" "}
              <a
                href="https://apoia.se/soujunior"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:opacity-70"
              >
                Virar apoiador no Apoia.se
              </a>{" "}
              ou{" "}
              <a
                href="https://discord.gg/soujunior"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:opacity-70"
              >
                pedir acesso no Discord
              </a>
              .
            </p>
          </div>
        </div>

        <Blueprint className="hidden w-full max-w-sm shrink-0 lg:block">
          <div className="flex items-center justify-center px-10 py-12">
            <span className="font-heading text-[9rem] font-bold leading-none text-primary xl:text-[11rem]">
              401
            </span>
          </div>

          <div className="border-t border-white/12" />

          <div className="flex flex-col divide-y divide-white/10">
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Status
              </span>
              <span className="font-heading text-sm font-semibold text-white">
                Unauthorized
              </span>
            </div>
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Recurso
              </span>
              <span className="font-mono text-xs font-semibold text-white/70">
                {displayPath}
              </span>
            </div>
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Sessão
              </span>
              <span className="font-heading text-sm font-semibold text-white">
                Expirada
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
          href="https://discord.gg/soujunior"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:opacity-70"
        >
          Pedir acesso ao time
        </a>
      </footer>
    </div>
  )
}
