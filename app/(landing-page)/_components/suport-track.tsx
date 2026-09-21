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

  return (
    <section
      id="contribuicao"
      className="mt-10"
    >
      <Blueprint className="p-8 sm:p-10">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          Sua trilha de apoio
        </h2>

        <p className="mt-4 text-base text-muted-foreground">
          {supportTrack.current} de {supportTrack.total} meses até o selo{" "}
          <strong className="text-foreground">
            {supportTrack.level}
          </strong>
        </p>

        <div
          className="mt-10 flex gap-1.5 overflow-hidden"
          aria-label={`${supportTrack.current} de ${supportTrack.total} meses concluídos`}
        >
          {completed.map((item) => (
            <span
              key={`completed-${item}`}
              className="h-14 min-w-3 flex-1 bg-primary sm:min-w-4"
            />
          ))}

          {remaining.map((item) => (
            <span
              key={`remaining-${item}`}
              className="h-14 min-w-3 flex-1 border border-border bg-background sm:min-w-4"
            />
          ))}
        </div>
      </Blueprint>
    </section>
  )
}