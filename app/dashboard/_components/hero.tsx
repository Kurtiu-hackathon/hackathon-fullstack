"use client"

import dynamic from "next/dynamic"
import { Blueprint } from "@/components/ui/blueprint"
import { heroStats } from "../_data/stats"

const HeroRede = dynamic(() => import("@/components/HeroRede"), {
  ssr: false,
})

export function Hero() {
  return (
    <section id="inicio" className="bg-navy text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <span
                className="block h-2 w-2 animate-pulse bg-primary"
                aria-hidden="true"
              />

              <span className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                Apoia.se · comunidade viva
              </span>
            </div>

            <h1 className="mt-0 max-w-2xl font-heading text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[82px]">
              Cada R$ 2 vira uma linha de{" "}
              <span className="text-primary">carreira júnior.</span>
            </h1>

            <p className="mt-6 max-w-xl font-body text-base leading-7 text-background/70 sm:text-lg">
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
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary px-6 py-3.5 font-heading text-[13px] font-semibold tracking-[0.04em] text-primary-foreground no-underline uppercase hover:bg-accent-700"
              >
                Apoiar com R$ 2
              </a>

              <a
                href="#destino"
                className="border-b border-background/30 pb-0.5 font-body text-sm font-semibold text-background no-underline hover:opacity-70"
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
                  <strong className="block font-heading text-2xl font-semibold">
                    {item.value}
                  </strong>

                  <span className="font-body text-[11px] tracking-[0.12em] text-background/60 uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <Blueprint className="relative h-[480px] overflow-hidden">
              <HeroRede className="absolute inset-0" />
            </Blueprint>
          </div>
        </div>

        <div className="border-t border-background/20 py-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-heading text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
              Meta mensal
            </span>

            <div
              className="relative h-4 min-w-40 flex-1 border border-background/20 bg-background/5"
              role="progressbar"
              aria-label="70% da meta atingida"
              aria-valuenow={70}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: "70%" }}
              />
            </div>

            <span className="font-body text-sm font-semibold text-background">
              70% · R$ 3.480 / R$ 5.000
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

