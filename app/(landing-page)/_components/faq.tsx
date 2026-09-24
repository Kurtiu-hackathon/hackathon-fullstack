import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion"
import { faq } from "../_data/faq"

export function Faq() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-18">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              08 — FAQ
            </p>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Perguntas que todo apoiador faz
            </h2>
          </div>

          <Accordion className="border-t border-border">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="py-5 text-base font-semibold">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent>
                  <p className="max-w-xl pb-5 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
