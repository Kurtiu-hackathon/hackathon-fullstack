import { Blueprint } from "@/components/ui/blueprint"
import { plans } from "../_data/plans"

export function Plans() {
  return (
    <section
      id="niveis"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-9">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            04 — Níveis de apoio
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Escolha seu commit mensal
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Qualquer valor a partir de R$ 2 entra no mesmo caixa
            transparente. Você cancela quando quiser, direto no Apoia.se.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Blueprint
              key={plan.name}
              className={
                "featured" in plan && plan.featured
                  ? "flex flex-col gap-4 border-primary bg-primary p-7 text-primary-foreground"
                  : "flex flex-col gap-4 p-7"
              }
            >
              <div className="flex min-h-5 items-start justify-between gap-3">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase">
                  {plan.name}
                </span>

                {"featured" in plan && plan.featured && (
                  <span className="bg-primary-foreground px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                    Mais escolhido
                  </span>
                )}
              </div>

              <strong className="font-heading text-5xl font-black leading-[0.9]">
                {plan.price}
              </strong>

              <p
                className={`flex-1 text-sm leading-6 ${
                  "featured" in plan && plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>

              <a
                href="https://apoia.se/soujunior"
                target="_blank"
                rel="noopener"
                className={
                  "featured" in plan && plan.featured
                    ? "inline-flex items-center justify-center bg-primary-foreground px-4 py-3 text-[11px] font-bold tracking-[0.04em] text-primary no-underline uppercase hover:opacity-90"
                    : "inline-flex items-center justify-center bg-primary px-4 py-3 text-[11px] font-bold tracking-[0.04em] text-primary-foreground no-underline uppercase hover:opacity-90"
                }
              >
                {"featured" in plan && plan.featured ? `Apoiar com ${plan.price}` : "Apoiar"}
              </a>
            </Blueprint>
          ))}
        </div>
      </div>
    </section>
  )
}
