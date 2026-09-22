import { impactStats } from "../_data/stats"

export function Impact() {
  return (
    <section
      id="impacto"
      className="bg-navy-deep text-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              03 — Impacto
            </p>

            <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-6xl">
              O que a comunidade construiu até aqui
            </h2>
          </div>

          <p className="text-xs tracking-[0.08em] text-background/60">
            números ilustrativos · atualizados no relatório mensal
          </p>
        </div>

        <div className="grid grid-cols-2 border-l border-t border-background/20">
          {impactStats.map((item) => (
            <article
              key={item.label}
              className="border-b border-r border-background/20 p-6 sm:p-8"
            >
              <strong className="block text-4xl font-black sm:text-6xl">
                {item.value}
              </strong>

              <span className="mt-2 block text-xs font-bold tracking-widest text-background/60 uppercase">
                {item.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
