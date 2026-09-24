import Image from "next/image"

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="shrink-0 no-underline"
          aria-label="SouJunior - início"
        >
          <Image
            src="/icos/logo-blue.svg"
            alt="SouJunior"
            width={275}
            height={104}
            priority
            className="h-auto w-40 sm:w-48"
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          <a
            href="#causa"
            className="font-body text-sm font-medium text-foreground no-underline hover:text-accent-700"
          >
            A causa
          </a>

          <a
            href="#impacto"
            className="font-body text-sm font-medium text-foreground no-underline hover:text-accent-700"
          >
            Impacto
          </a>

          <a
            href="#niveis"
            className="font-body text-sm font-medium text-foreground no-underline hover:text-accent-700"
          >
            Níveis
          </a>

          <a
            href="#trajetorias"
            className="font-body text-sm font-medium text-foreground no-underline hover:text-accent-700"
          >
            Trajetórias
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="/login"
            className="inline-flex border border-foreground px-4 py-2.5 font-heading text-[11px] font-semibold tracking-[0.12em] text-foreground no-underline uppercase hover:border-accent-700 hover:text-accent-700"
          >
            Entrar
          </a>

          <a
            href="https://apoia.se/soujunior"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary px-4 py-2.5 font-heading text-[11px] font-semibold tracking-[0.12em] text-primary-foreground no-underline uppercase hover:bg-accent-700"
          >
            Apoiar agora
          </a>
        </div>
      </div>
    </header>
  )
}
