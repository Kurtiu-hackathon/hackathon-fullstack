const links = [
  {
    name: "Discord",
    description: "Dúvidas, vagas e as mentorias acontecem aqui.",
    cta: "Entrar →",
    href: "https://discord.com/invite/soujunior-community-759176734460346423",
  },
  {
    name: "WhatsApp",
    description: "Grupo de avisos: eventos, prazos e novidades.",
    cta: "Receber avisos →",
    href: "https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W",
  },
  {
    name: "GitHub",
    description: "14 repositórios abertos pra sua primeira contribuição.",
    cta: "Contribuir →",
    href: "https://github.com/SouJunior",
  },
] as const

export function Ecosystem() {
  return (
    <section className="bg-navy text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-9">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            07 — Ecossistema
          </p>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Entra na comunidade — apoiar é só uma das portas
          </h2>
        </div>

        <div className="grid border border-background/20 sm:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="block border-r border-b border-background/20 p-8 last:border-r-0 no-underline hover:bg-background/5 transition-colors"
            >
              <h3 className="mb-2 font-heading text-2xl font-semibold text-background">
                {link.name}
              </h3>

              <p className="text-sm leading-6 text-background/60">
                {link.description}
              </p>

              <span className="mt-5 block text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                {link.cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
