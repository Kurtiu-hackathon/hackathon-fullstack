const items = [
  "Mentoria gratuita",
  "Open source real",
  "Primeiro emprego",
  "Comunidade júnior",
  "Feito por quem já foi júnior",
]

export function Ticker() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap bg-navy-deep py-3 text-background"
      aria-hidden="true"
    >
      <div className="inline-flex animate-ticker gap-10 text-[11px] font-semibold tracking-[0.18em] uppercase">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
