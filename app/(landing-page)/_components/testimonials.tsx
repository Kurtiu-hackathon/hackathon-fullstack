import Image from "next/image"
import { Blueprint } from "@/components/ui/blueprint"
import { testimonials } from "../_data/testimonials"

export function Testimonials() {
  return (
    <section
      id="trajetorias"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="border-t border-border pt-8">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            05 — Quem passou por aqui
          </p>

          <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            Primeira oportunidade. Experiência que fica.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Blueprint
              key={item.quote}
              className="flex flex-col gap-5 p-7"
            >
              <blockquote className="flex-1 font-heading text-xl font-semibold leading-7 tracking-tight text-foreground sm:text-2xl">
                "{item.quote}"
              </blockquote>

              <div className="flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt={item.author}
                  width={44}
                  height={44}
                  className="shrink-0"
                />

                <div className="text-sm text-muted-foreground">
                  <strong className="block font-semibold text-foreground">
                    {item.author}
                  </strong>
                  {item.role}
                </div>
              </div>
            </Blueprint>
          ))}
        </div>
      </div>
    </section>
  )
}
