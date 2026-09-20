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
            src="/logo-soujunior.png"
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
            className="text-sm font-medium text-foreground no-underline hover:opacity-70"
          >
            A causa
          </a>

          <a
            href="#impacto"
            className="text-sm font-medium text-foreground no-underline hover:opacity-70"
          >
            Impacto
          </a>

          <a
            href="#niveis"
            className="text-sm font-medium text-foreground no-underline hover:opacity-70"
          >
            Níveis
          </a>

          <a
            href="#trajetorias"
            className="text-sm font-medium text-foreground no-underline hover:opacity-70"
          >
            Trajetórias
          </a>

          <a
            href="#niveis"
            className="text-sm font-semibold text-primary no-underline hover:opacity-70"
          >
            Apoiar
          </a>
        </nav>
      </div>
    </header>
  )
}