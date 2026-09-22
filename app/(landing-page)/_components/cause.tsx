import { Blueprint } from "@/components/ui/blueprint"

const stats = [
  { value: "1.280", label: "mentorias 1:1 realizadas, sem custo pro júnior" },
  { value: "62%", label: "dos participantes ativos foram contratados em até 8 meses" },
  { value: "R$ 0", label: "é o que custa entrar: a conta fecha com apoio recorrente" },
  { value: "100%", label: "do time é voluntário — nenhum real vira salário" },
] as const

export function Cause() {
  return (
    <section
      id="causa"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-18">
          <div>
            <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              01 — A causa
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Ninguém deveria precisar de 3 anos de experiência para ter
              o primeiro ano.
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              A SouJunior existe pra furar esse ciclo: mentoria de quem
              já está dentro, projetos de verdade no portfólio e uma rede
              que indica. Tudo gratuito pra quem participa — e sustentado
              por quem apoia.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <Blueprint key={item.value} className="p-6">
                <strong className="block text-4xl font-black text-primary">
                  {item.value}
                </strong>

                <p className="mt-3 text-sm text-muted-foreground">
                  {item.label}
                </p>
              </Blueprint>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
