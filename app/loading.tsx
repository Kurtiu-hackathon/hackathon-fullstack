"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Blueprint } from "@/components/ui/blueprint"

const STEPS = [
  "Autenticando sessão",
  "Carregando seus apoios",
  "Sincronizando comunidades",
  "Montando o painel",
]

const HINTS = [
  "Dica: você cancela o apoio a qualquer momento no Apoia.se.",
  "Dica: as mentorias abrem nova fila toda segunda-feira.",
  "Dica: 14 repositórios esperando sua primeira contribuição.",
  "Dica: o relatório de contas sai no dia 5 de cada mês.",
]

const CELL_DELAYS = [
  "0s",   ".12s", ".24s", ".36s",
  ".12s", ".24s", ".36s", ".48s",
  ".24s", ".36s", ".48s", ".6s",
  ".36s", ".48s", ".6s",  ".72s",
]

export default function LoadingPage() {
  const [pct, setPct] = useState(4)

  useEffect(() => {
    const t = setInterval(() => {
      setPct((prev) => {
        const step = prev < 60 ? 6 : prev < 85 ? 3 : 1.2
        const next = prev + step
        return next >= 100 ? 4 : next
      })
    }, 420)
    return () => clearInterval(t)
  }, [])

  const stepIndex = Math.min(3, Math.floor(pct / 26))
  const pctRounded = Math.min(100, Math.round(pct))

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-navy text-white"
      style={
        {
          "--primary": "#3c7ef9",
          "--border": "rgba(255,255,255,0.12)",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(60,126,249,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(60,126,249,.09) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "sjGridDrift 12s linear infinite",
        }}
      />

      <header className="relative flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 lg:px-10">
        <Image
          src="/icos/logo-white.svg"
          alt="SouJunior"
          width={275}
          height={104}
          priority
          className="h-[22px] w-auto"
        />
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50">
          <span
            aria-hidden="true"
            className="block size-1.5 bg-primary"
            style={{ animation: "sjBlink 1.1s infinite" }}
          />
          Carregando
        </div>
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16 text-center lg:px-10">
        <Blueprint className="p-6 sm:p-8">
          <div className="relative overflow-hidden">
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(4, clamp(18px, 2.6vw, 26px))",
                gap: "clamp(5px, .8vw, 8px)",
              }}
            >
              {CELL_DELAYS.map((delay, i) => (
                <div
                  key={i}
                  className="aspect-square"
                  style={{ animation: "sjCell 2.2s ease-in-out infinite", animationDelay: delay }}
                />
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute left-0 right-0 top-0 h-px"
                style={{
                  background: "linear-gradient(90deg,transparent,rgba(60,126,249,.9),transparent)",
                  animation: "sjScanY 2.6s linear infinite",
                }}
              />
            </div>
          </div>
        </Blueprint>

        <div>
          <h1 className="font-heading mb-3 text-[clamp(24px,3vw,38px)] font-bold leading-[1.08]">
            Preparando seu painel
          </h1>
          <p className="mx-auto max-w-[44ch] text-[15px] leading-relaxed text-white/65">
            Buscando seus apoios, prêmios e as comunidades que você acompanha.
            Leva alguns segundos.
          </p>
        </div>

        <div className="flex w-full max-w-[520px] flex-col gap-3">
          <div className="relative h-2 overflow-hidden border border-white/22 bg-white/4">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-[450ms] ease-out"
              style={{ width: `${pctRounded}%` }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 w-2/5"
              style={{
                background: "linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)",
                animation: "sjSweep 1.6s linear infinite",
              }}
            />
          </div>

          <div className="flex justify-between gap-4 text-[11.5px] uppercase tracking-[0.16em] text-white/50">
            <span className="text-left">{STEPS[stepIndex]}</span>
            <span className="flex-none font-heading text-primary/80">{pctRounded}%</span>
          </div>

          <div
            aria-hidden="true"
            className="h-[3px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,rgba(60,126,249,.55) 0 8px,transparent 8px 28px)",
              animation: "sjMarch 1.1s linear infinite",
            }}
          />
        </div>
      </main>

      <footer className="relative flex flex-wrap justify-between gap-4 border-t border-white/10 px-6 py-5 text-[12.5px] text-white/50 lg:px-10">
        <span>SouJunior — comunidade voluntária de tecnologia</span>
        <span>{HINTS[stepIndex]}</span>
      </footer>
    </div>
  )
}
