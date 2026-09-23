import { Blueprint } from "@/components/ui/blueprint"

import { supportTrack } from "../_data/stats"

export function SupportTrack() {
  const completed = Array.from(
    { length: supportTrack.current },
    (_, index) => index
  )

  const remaining = Array.from(
    { length: supportTrack.total - supportTrack.current },
    (_, index) => index
  )

  const percentage =
    (supportTrack.current / supportTrack.total) * 100

  return (
    <section id="contribuicao" className="mt-10">
      <Blueprint className="p-8 sm:p-10">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Sua trilha de apoio
        </h2>

        <p className="mt-4 font-body text-base text-muted-foreground">
          {supportTrack.current} de {supportTrack.total} meses até o selo{" "}
          <strong className="font-semibold text-foreground">
            {supportTrack.level}
          </strong>
        </p>

        <div
          className="mt-10 flex gap-1.5 overflow-hidden"
          role="progressbar"
          aria-label={`${supportTrack.current} de ${supportTrack.total} meses concluídos`}
          aria-valuenow={supportTrack.current}
          aria-valuemin={0}
          aria-valuemax={supportTrack.total}
        >
          {completed.map((item) => (
            <span
              key={`completed-${item}`}
              aria-hidden="true"
              className="h-14 min-w-3 flex-1 bg-primary sm:min-w-4"
            />
          ))}

          {remaining.map((item) => (
            <span
              key={`remaining-${item}`}
              aria-hidden="true"
              className="h-14 min-w-3 flex-1 border border-border bg-transparent sm:min-w-4"
            />
          ))}
        </div>

        <p className="mt-4 font-heading text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {percentage.toFixed(0)}% concluído
        </p>
      </Blueprint>
    </section>
  )
}
