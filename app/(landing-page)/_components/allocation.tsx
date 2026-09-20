import { Blueprint } from "@/components/ui/blueprint"
import { allocation } from "../_data/allocation"

export function Allocation() {
  return (
    <section
      id="apoio"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary">
          02 — TRANSPARÊNCIA
        </p>

        <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          Seu apoio tem endereço
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          Divisão média dos últimos 6 meses de arrecadação no
          Apoia.se.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {allocation.map((item) => (
            <Blueprint
              key={item.title}
              className="p-6 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <strong className="text-4xl font-black">
                  {item.percentage}
                </strong>

                <div
                  className="h-2 flex-1 bg-muted"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full bg-primary ${item.barClass}`}
                  />
                </div>
              </div>

              <h3 className="mt-7 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </Blueprint>
          ))}
        </div>
      </div>
    </section>
  )
}