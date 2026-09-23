import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-navy text-background">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-background/20 pb-9 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/icos/logo-white.svg"
              alt="SouJunior"
              width={275}
              height={104}
              className="h-6 w-auto"
            />

            <p className="mt-4 max-w-xs font-body text-sm leading-6 text-background/60">
              Comunidade brasileira que abre a primeira porta de carreira
              em tecnologia.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 font-body text-sm">
            <h3 className="mb-1 font-heading text-[11px] font-semibold tracking-[0.14em] text-background uppercase">
              Apoio
            </h3>

            <a
              href="https://apoia.se/soujunior"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              Apoia.se
            </a>

            <a
              href="#niveis"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              Níveis de apoio
            </a>

            <a
              href="#contas"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              Relatórios
            </a>
          </div>

          <div className="flex flex-col gap-2.5 font-body text-sm">
            <h3 className="mb-1 font-heading text-[11px] font-semibold tracking-[0.14em] text-background uppercase">
              Comunidade
            </h3>

            <a
              href="https://discord.gg/soujunior"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              Discord
            </a>

            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              WhatsApp
            </a>

            <a
              href="https://github.com/soujunior"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              GitHub
            </a>
          </div>

          <div className="flex flex-col gap-2.5 font-body text-sm">
            <h3 className="mb-1 font-heading text-[11px] font-semibold tracking-[0.14em] text-background uppercase">
              SouJunior
            </h3>

            <a
              href="https://soujunior.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              soujunior.tech
            </a>

            <a
              href="https://soujunior.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 no-underline hover:text-accent-700"
            >
              Seja voluntário
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 font-body text-[11px] text-background/40">
          <span>© 2026 SouJunior · números ilustrativos</span>
          <span>apoia.se/soujunior</span>
        </div>
      </div>
    </footer>
  )
}
