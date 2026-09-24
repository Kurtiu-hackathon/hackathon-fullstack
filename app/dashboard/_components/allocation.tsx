import { allocation } from "../_data/allocation"

export function Allocation() {
  return (
    <section
      id="destino"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-7 mb-9">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              02 — Para onde vai
            </p>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Seu apoio tem endereço
            </h2>
          </div>

          <p className="text-sm text-muted-foreground max-w-xs">
            Divisão média dos últimos 6 meses de arrecadação no Apoia.se.
          </p>
        </div>

        <div className="grid border border-border sm:grid-cols-2 lg:grid-cols-4">
          {allocation.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 border-r border-b border-border p-7 last:border-r-0"
            >
              <div>
                <span className="font-heading text-5xl font-black leading-[0.9] tracking-tight">
                  {item.percentage.replace("%", "")}
                </span>
                <span className="font-heading text-xl font-black text-primary">
                  %
                </span>
              </div>

              <div className="h-1.5 w-full bg-muted">
                <div className={`h-full bg-primary ${item.barClass}`} />
              </div>

              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>

                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
