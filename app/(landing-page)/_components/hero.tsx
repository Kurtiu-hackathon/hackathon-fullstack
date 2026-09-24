"use client"
import dynamic from "next/dynamic"
import { Blueprint } from "@components/ui/blueprint"
import { heroStats } from "../_data/stats"

const HeroRede = dynamic(() => import("@components/HeroRede"), { ssr: false })

export function Hero() {
  return (
    <section
      id="inicio"
      className="bg-navy text-background"
      style={{
        backgroundImage:
          "linear-gradient(color-mix(in srgb,var(--primary) 8%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--primary) 8%,transparent) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="block h-2 w-2 animate-pulse bg-primary" />
              <span className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                Apoia.se · comunidade viva
              </span>
            </div>

            <h1 className="mt-0 max-w-2xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-[82px]">
              Cada R$ 2 vira uma linha de{" "}
              <span className="text-primary">carreira júnior.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-background/70 sm:text-lg">
              A SouJunior é mantida pela própria galera. Mentoria de
              graça, projetos open-source reais e a primeira oportunidade
              de milhares de juniores — tudo isso roda porque alguém
              apoia. Pode ser você, começando com o preço de um café pela
              metade.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://apoia.se/soujunior"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center bg-primary px-6 py-3.5 text-[13px] font-bold tracking-[0.04em] text-primary-foreground no-underline uppercase hover:opacity-90"
              >
                Apoiar com R$ 2
              </a>

              <a
                href="#destino"
                className="border-b border-background/30 pb-0.5 text-sm font-semibold text-background no-underline hover:opacity-70"
              >
                Ver para onde vai o dinheiro →
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 border-t border-background/20">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="border-r border-background/20 px-3 py-5 last:border-r-0"
                >
                  <strong className="block text-2xl font-black">
                    {item.value}
                  </strong>

                  <span className="text-[11px] uppercase tracking-[0.12em] text-background/60">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <Blueprint
              className="relative h-[480px] overflow-hidden border-background/20"
              style={{
                backgroundImage:
                  "linear-gradient(color-mix(in srgb,var(--primary) 6%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--primary) 6%,transparent) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              <HeroRede className="absolute inset-0" />
            </Blueprint>
          </div>
        </div>

        <div className="border-t border-background/20 py-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
              Meta mensal
            </span>

            <div className="relative h-4 flex-1 min-w-40 border border-background/20 bg-background/5">
              <div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: "70%" }}
                aria-label="70% da meta atingida"
              />
            </div>

            <span className="text-sm font-semibold text-background">
              70% · R$ 3.480 / R$ 5.000
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
