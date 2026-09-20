import { Blueprint } from "@/components/ui/blueprint"

export function Cause() {
  return (
    <section
      id="causa"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Ninguém deveria precisar de 3 anos de experiência
            para ter o primeiro ano.
          </h2>

          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            A SouJunior existe para furar esse ciclo: mentoria de
            quem já está dentro, projetos de verdade no portfólio
            e uma rede que indica. Tudo gratuito para quem participa
            — e sustentado por quem apoia.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Blueprint className="p-6">
            <strong className="text-5xl font-black">
              1.280
            </strong>

            <p className="mt-5 text-sm text-muted-foreground">
              mentorias 1:1 realizadas, sem custo para o júnior
            </p>
          </Blueprint>

          <Blueprint className="p-6">
            <strong className="text-5xl font-black">
              62%
            </strong>

            <p className="mt-5 text-sm text-muted-foreground">
              dos participantes ativos foram contratados em até
              8 meses
            </p>
          </Blueprint>

          <Blueprint className="p-6">
            <strong className="text-5xl font-black">
              R$ 0
            </strong>

            <p className="mt-5 text-sm text-muted-foreground">
              é o que custa entrar: a conta fecha com apoio da
              comunidade
            </p>
          </Blueprint>
        </div>
      </div>
    </section>
  )
}