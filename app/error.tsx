"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Blueprint } from "@components/ui/blueprint"
import { Button } from "@components/ui/button"

interface ErrorPageProps {
  error: Error & { digest?: string }
  retry: () => void
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState("")
  const incidentCode = error.digest

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }, [])

  function handleCopy() {
    if (!incidentCode) return
    void navigator.clipboard.writeText(incidentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
          Erro 500
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-start gap-12 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <div className="flex flex-1 flex-col gap-7">
          <div className="flex items-center gap-2.5">
            <span className="size-2 shrink-0 bg-primary" aria-hidden="true" />
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Falha no servidor
            </span>
          </div>

          <h1 className="font-heading text-5xl font-bold leading-[1.08] text-white lg:text-6xl">
            Alguma coisa quebrou do nosso lado.
          </h1>

          <p className="max-w-[44ch] text-[15px] leading-relaxed text-white/55">
            Não foi você. O time já recebeu o registro dessa falha. Tenta de
            novo em alguns instantes — se continuar, avisa a gente no Discord
            com o código abaixo.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={retry} className="uppercase tracking-[0.08em]">
              Tentar de novo
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

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
              Código do incidente
            </span>
            {incidentCode ? (
              <>
                <code className="border border-white/20 px-2.5 py-1 font-mono text-xs text-white/65">
                  {incidentCode}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="font-heading text-[11px] uppercase tracking-[0.12em] text-primary hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </>
            ) : (
              <span className="font-mono text-xs text-white/30">—</span>
            )}
          </div>
        </div>

        <Blueprint className="hidden w-full max-w-sm shrink-0 lg:block">
          <div className="flex items-center justify-center px-10 py-12">
            <span className="font-heading text-[9rem] font-bold leading-none text-primary xl:text-[11rem]">
              500
            </span>
          </div>

          <div className="border-t border-white/12" />

          <div className="flex flex-col divide-y divide-white/10">
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Status
              </span>
              <span className="font-heading text-sm font-semibold text-white">
                {error.name === "Error" ? "Internal Server Error" : error.name}
              </span>
            </div>
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Serviço
              </span>
              <span className="font-heading text-sm font-semibold text-white">
                api-apoiadores
              </span>
            </div>
            <div className="flex items-center justify-between px-7 py-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white/35">
                Horário
              </span>
              <span className="font-heading text-sm font-semibold text-white">
                {time}
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
