import { Blueprint } from "@/components/ui/blueprint"

type Event = {
  day: string
  month: string
  time: string
  tag: string
  tagStyle: "accent" | "dark"
  title: string
  description: string
  cta: string
}

const EVENTS: Event[] = [
  {
    day: "22",
    month: "set",
    time: "19h",
    tag: "Mentoria",
    tagStyle: "accent",
    title: "Review de portfólio front-end",
    description: "Três mentores sênior revisam portfólios ao vivo. Vagas por ordem de inscrição.",
    cta: "Reservar vaga",
  },
  {
    day: "29",
    month: "set",
    time: "20h",
    tag: "Squad",
    tagStyle: "accent",
    title: "Kickoff do squad Data",
    description: "Abertura do novo projeto open-source de dados abertos. Aberto a apoiadores.",
    cta: "Participar",
  },
  {
    day: "05",
    month: "out",
    time: "10h",
    tag: "Comunidade",
    tagStyle: "accent",
    title: "Clube do Livro: Team Topologies",
    description: "Encontro dos capítulos 4 a 6, com facilitação do time de Agile.",
    cta: "Adicionar à agenda",
  },
  {
    day: "14",
    month: "out",
    time: "19h30",
    tag: "Só apoiadores",
    tagStyle: "dark",
    title: "Bastidores: como a grana é aplicada",
    description: "Call aberta com o time de operações mostrando o caixa do mês linha por linha.",
    cta: "Confirmar presença",
  },
]

export function DashboardEvents() {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-heading text-[19px] font-bold">Próximos eventos</h2>
        <a
          href="https://discord.gg/soujunior"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12.5px] text-primary no-underline hover:underline"
        >
          Ver agenda no Discord <span aria-hidden="true">→</span>
          <span className="sr-only"> (abre em nova janela)</span>
        </a>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-[clamp(12px,1.6vw,20px)]">
        {EVENTS.map((event) => (
          <Blueprint
            key={event.title}
            className="flex flex-col gap-3 p-[20px_18px]"
          >
            <div className="flex items-start justify-between gap-2.5">
              <div>
                <div className="font-heading text-[30px] font-extrabold leading-none">
                  {event.day}
                </div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {event.month} · {event.time}
                </div>
              </div>
              <span
                className={
                  event.tagStyle === "dark"
                    ? "bg-navy px-2 py-1 text-[10.5px] uppercase tracking-[0.1em] text-background"
                    : "bg-[var(--accent-200)] px-2 py-1 text-[10.5px] uppercase tracking-[0.1em] text-[var(--accent-800)]"
                }
              >
                {event.tag}
              </span>
            </div>

            <h3 className="font-heading text-[17px] font-semibold leading-snug">
              {event.title}
            </h3>

            <p className="flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
              {event.description}
            </p>

            <button
              type="button"
              aria-label={`${event.cta}: ${event.title}`}
              className="border border-foreground bg-transparent px-2.5 py-2.5 font-heading text-[12.5px] uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              {event.cta}
            </button>
          </Blueprint>
        ))}
      </div>
    </section>
  )
}
