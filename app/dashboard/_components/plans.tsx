import { Blueprint } from "@/components/ui/blueprint"
import { plans } from "../_data/plans"

export function Plans() {
  return (
    <section id="niveis" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-9">
          <p className="mb-3 font-heading text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            04 — Níveis de apoio
          </p>

          <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Escolha seu commit mensal
          </h2>

          <p className="mt-4 max-w-2xl font-body text-base leading-7 text-muted-foreground">
            Qualquer valor a partir de R$ 2 entra no mesmo caixa
            transparente. Você cancela quando quiser, direto no Apoia.se.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const featured = "featured" in plan && plan.featured

            return (
              <Blueprint
                key={plan.name}
                className={[
                  "flex flex-col gap-4 p-7",
                  featured
                    ? "border-primary"
                    : "",
                ].join(" ")}
              >
                <div className="flex min-h-5 items-start justify-between gap-3">
                  <span className="font-heading text-[11px] font-semibold tracking-[0.16em] text-foreground uppercase">
                    {plan.name}
                  </span>

                  {featured && (
                    <span className="bg-primary px-2 py-0.5 font-heading text-[10px] font-semibold text-primary-foreground uppercase">
                      Mais escolhido
                    </span>
                  )}
                </div>

                <strong
                  className={[
                    "font-heading text-5xl font-semibold leading-[0.9]",
                    featured ? "text-primary" : "text-foreground",
                  ].join(" ")}
                >
                  {plan.price}
                </strong>

                <p className="flex-1 font-body text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>

                <a
                  href="https://apoia.se/soujunior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "inline-flex items-center justify-center px-4 py-3 font-heading text-[11px] font-semibold tracking-[0.04em] no-underline uppercase transition-colors",
                    featured
                      ? "border border-primary bg-transparent text-primary hover:bg-accent-700 hover:text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-accent-700",
                  ].join(" ")}
                >
                  {featured
                    ? `Apoiar com ${plan.price}`
                    : "Apoiar"}
                </a>
              </Blueprint>
            )
          })}
        </div>
      </div>
    </section>
  )
}
