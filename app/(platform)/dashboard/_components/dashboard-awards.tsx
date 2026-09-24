import { cn } from "cn"

type Award = {
  name: string
  description: string
  unlocked: boolean
  remaining?: string
}

const AWARDS: Award[] = [
  { name: "Primeiro commit", description: "1º mês de apoio", unlocked: true },
  { name: "Code review", description: "3 meses seguidos", unlocked: true },
  { name: "Deploy noturno", description: "6 meses seguidos", unlocked: true },
  { name: "Pair programming", description: "1 mentoria bancada", unlocked: true },
  { name: "Mentor da casa", description: "1 ano de apoio", unlocked: true },
  { name: "Open source", description: "Squad sustentado", unlocked: true },
  { name: "Tech lead", description: "faltam 6 meses", unlocked: false, remaining: "faltam 6 meses" },
  { name: "Fundador", description: "24 meses de apoio", unlocked: false, remaining: "faltam 6 meses" },
  { name: "Embaixador", description: "indique 3 apoiadores", unlocked: false, remaining: "indique 3 apoiadores" },
]

export function DashboardAwards() {
  const unlocked = AWARDS.filter((a) => a.unlocked).length

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-heading text-[19px] font-bold">Prêmios de apoiador</h2>
        <span className="text-[12.5px] text-muted-foreground">
          {unlocked} de {AWARDS.length} conquistados
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,145px),1fr))] border border-border">
        {AWARDS.map((award) => (
          <div
            key={award.name}
            className={cn(
              "border-b border-r border-border p-[20px_18px]",
              !award.unlocked && "opacity-45"
            )}
          >
            <div
              className={cn(
                "mb-3 h-[30px] w-[30px] border",
                award.unlocked
                  ? "border-primary bg-primary"
                  : "border-dashed border-foreground/50 bg-transparent"
              )}
            />
            <div className="font-heading text-[15.5px] font-semibold">
              {award.name}
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">
              {award.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
