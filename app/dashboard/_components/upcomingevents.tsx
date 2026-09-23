import { Blueprint } from "@/components/ui/blueprint"

import { upcomingEvents } from "../_data/events"

export function UpcomingEvents() {
  return (
    <section
      id="eventos"
      className="mt-12"
    >
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          Próximos eventos
        </h2>

        <a
          href="#eventos"
          className="hidden text-sm font-medium text-primary no-underline sm:block"
        >
          Ver agenda no Discord →
        </a>
      </div>

      <div className="mt-6 space-y-2">
        {upcomingEvents.map((event) => (
          <Blueprint
            key={`${event.day}-${event.title}`}
            className="p-8 sm:p-10"
          >
            <div className="flex flex-col gap-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <strong className="block text-5xl font-black leading-none sm:text-6xl">
                    {event.day}
                  </strong>

                  <span className="mt-3 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {event.date}
                  </span>
                </div>

                <span
                  className={
                    event.type === "SÓ APOIADORES"
                      ? "bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-background"
                      : "bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-primary"
                  }
                >
                  {event.type}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
                  {event.title}
                </h3>

                <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {event.description}
                </p>
              </div>

              <a
                href="#"
                className="flex min-h-14 items-center justify-center border border-foreground px-6 text-sm font-medium text-foreground no-underline transition-colors hover:bg-foreground hover:text-background"
              >
                {event.action}
              </a>
            </div>
          </Blueprint>
        ))}
      </div>
    </section>
  )
}
