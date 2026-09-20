import { Blueprint } from "@/components/ui/blueprint"
import { plans } from "../_data/plans"

export function Plans() {
  return (
    <section
      id="niveis"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary">
          04 — NÍVEIS DE APOIO
        </p>

        <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
          Escolha seu commit mensal
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          Qualquer valor a partir de R$ 2 entra no mesmo caixa
          transparente. Você cancela quando quiser, direto no
          Apoia.se.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <Blueprint
              key={plan.name}
              className={
                plan.featured
                  ? "border-primary bg-primary p-6 text-primary-foreground sm:p-8"
                  : "p-6 sm:p-8"
              }
            >
              <div className="flex min-h-8 items-start justify-between gap-4">
                <span className="text-xs font-bold tracking-widest">
                  {plan.name}
                </span>

                {plan.featured && (
                  <span className="rounded-full bg-primary-foreground px-3 py-1 text-[10px] font-bold text-primary">
                    MAIS ESCOLHIDO
                  </span>
                )}
              </div>

              <strong className="mt-8 block text-5xl font-black">
                {plan.price}
              </strong>

              <p
                className={
                  plan.featured
                    ? "mt-5 min-h-16 leading-7 opacity-80"
                    : "mt-5 min-h-16 leading-7 text-muted-foreground"
                }
              >
                {plan.description}
              </p>

              <a
                href="#apoia-se"
                className={
                  plan.featured
                    ? "mt-8 inline-flex rounded-md bg-primary-foreground px-5 py-3 text-sm font-bold text-primary no-underline hover:opacity-90"
                    : "mt-8 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground no-underline hover:opacity-90"
                }
              >
                {plan.featured
                  ? `APOIAR COM ${plan.price}`
                  : "APOIAR"}
              </a>
            </Blueprint>
          ))}
        </div>
      </div>
    </section>
  )
}