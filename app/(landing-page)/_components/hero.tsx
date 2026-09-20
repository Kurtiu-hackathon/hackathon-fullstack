import { heroStats } from "../_data/stats"

export function Hero() {
  return (
    <section
      id="inicio"
      className="bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary">
          ■ APOIA.SE · COMUNIDADE VIVA
        </p>

        <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          Cada R$ 2 vira uma linha de{" "}
          <span className="text-primary">
            carreira júnior.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-7 text-background/70 sm:text-lg">
          A SouJunior é mantida pela própria galera. Mentoria de
          graça, projetos open-source reais e a primeira oportunidade
          de milhares de juniores — tudo isso roda porque alguém apoia.
          Pode ser você, começando com o preço de um café pela metade.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#niveis"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground no-underline hover:opacity-90"
          >
            APOIAR COM R$ 2
          </a>

          <a
            href="#apoio"
            className="text-sm font-semibold text-background no-underline hover:opacity-70"
          >
            Ver para onde vai o dinheiro →
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 border-t border-background/20">
          {heroStats.map((item) => (
            <div
              key={item.label}
              className="border-r border-background/20 px-3 py-6 last:border-r-0"
            >
              <strong className="block text-2xl font-black">
                {item.value}
              </strong>

              <span className="text-xs text-background/60">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}