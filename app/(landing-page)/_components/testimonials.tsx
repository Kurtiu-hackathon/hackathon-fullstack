import { Blueprint } from "@/components/ui/blueprint"
import { testimonials } from "../_data/testimonials"

export function Testimonials() {
  return (
    <section
      id="trajetorias"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary">
          05 — QUEM PASSOU POR AQUI
        </p>

        <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          Primeira oportunidade. Experiência que fica.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <Blueprint
              key={item.quote}
              className="p-6 sm:p-8"
            >
              <span className="text-5xl font-black text-primary">
                “
              </span>

              <blockquote className="mt-3 text-xl leading-8 sm:text-2xl">
                {item.quote}
              </blockquote>

              <p className="mt-6 text-sm text-muted-foreground">
                — {item.author}
              </p>
            </Blueprint>
          ))}
        </div>
      </div>
    </section>
  )
}