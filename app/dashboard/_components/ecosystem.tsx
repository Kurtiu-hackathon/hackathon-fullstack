const links = [
  {
    name: "Discord",
    description: "Dúvidas, vagas e as mentorias acontecem aqui.",
    cta: "Entrar →",
    href: "https://discord.gg/soujunior",
  },
  {
    name: "WhatsApp",
    description: "Grupo de avisos: eventos, prazos e novidades.",
    cta: "Receber avisos →",
    href: "https://whatsapp.com",
  },
  {
    name: "GitHub",
    description: "14 repositórios abertos pra sua primeira contribuição.",
    cta: "Contribuir →",
    href: "https://github.com/soujunior",
  },
] as const

export function Ecosystem() {
  return (
    <section className="bg-navy text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-heading text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            07 — Ecossistema
          </p>

          <h2 className="max-w-3xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Entra na comunidade — apoiar é só uma das portas
          </h2>
        </div>

        <div className="grid border border-background/20 sm:grid-cols-3">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "block p-8 no-underline transition-colors",
                "border-b border-background/20",
                "sm:border-b-0 sm:border-r",
                index === links.length - 1 ? "sm:border-r-0" : "",
                "hover:border-accent-700",
              ].join(" ")}
            >
              <h3 className="mb-2 font-heading text-2xl font-semibold text-background">
                {link.name}
              </h3>

              <p className="font-body text-sm leading-6 text-background/60">
                {link.description}
              </p>

              <span className="mt-5 block font-heading text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                {link.cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
