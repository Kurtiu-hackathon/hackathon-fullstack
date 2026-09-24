import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-navy text-background">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-background/20 pb-9 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/icos/logo-white.svg"
              alt="SouJunior"
              width={275}
              height={104}
              className="h-6 w-auto"
            />

            <p className="mt-4 max-w-xs text-sm leading-6 text-background/60">
              Comunidade brasileira que abre a primeira porta de carreira
              em tecnologia.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <h3 className="mb-1 text-[11px] font-bold tracking-[0.14em] text-background uppercase">
              Apoio
            </h3>

            <a href="https://apoia.se/soujunior" target="_blank" rel="noopener" className="text-background/60 no-underline hover:text-background">
              Apoia.se
            </a>
            <a href="#niveis" className="text-background/60 no-underline hover:text-background">
              Níveis de apoio
            </a>
            <a href="#contas" className="text-background/60 no-underline hover:text-background">
              Relatórios
            </a>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <h3 className="mb-1 text-[11px] font-bold tracking-[0.14em] text-background uppercase">
              Comunidade
            </h3>

            <a href="https://discord.com/invite/soujunior-community-759176734460346423" target="_blank" rel="noopener" className="text-background/60 no-underline hover:text-background">
              Discord
            </a>
            <a href="https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W" target="_blank" rel="noopener" className="text-background/60 no-underline hover:text-background">
              WhatsApp
            </a>
            <a href="https://github.com/SouJunior" target="_blank" rel="noopener" className="text-background/60 no-underline hover:text-background">
              GitHub
            </a>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <h3 className="mb-1 text-[11px] font-bold tracking-[0.14em] text-background uppercase">
              SouJunior
            </h3>

            <a href="https://soujunior.tech" target="_blank" rel="noopener" className="text-background/60 no-underline hover:text-background">
              soujunior.tech
            </a>
            <a href="https://stars.soujunior.tech/" target="_blank" rel="noopener" className="text-background/60 no-underline hover:text-background">
              Seja voluntário
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 text-[11px] text-background/40">
          <span>© 2026 SouJunior · números ilustrativos</span>
          <span>apoia.se/soujunior</span>
        </div>
      </div>
    </footer>
  )
}
