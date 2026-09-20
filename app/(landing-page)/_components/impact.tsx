import { impactStats } from "../_data/stats"

export function Impact() {
  return (
    <section
      id="impacto"
      className="bg-primary text-primary-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] opacity-80">
          03 — IMPACTO
        </p>

        <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          O que a comunidade construiu até aqui
        </h2>

        <p className="mt-5 text-sm opacity-75">
          números ilustrativos · atualizados no relatório mensal
        </p>

        <div className="mt-14 grid grid-cols-2 border-l border-t border-primary-foreground/20">
          {impactStats.map((item) => (
            <article
              key={item.label}
              className="border-b border-r border-primary-foreground/20 p-6 sm:p-8"
            >
              <strong className="block text-4xl font-black sm:text-6xl">
                {item.value}
              </strong>

              <span className="mt-2 block text-xs font-bold tracking-widest opacity-75">
                {item.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}