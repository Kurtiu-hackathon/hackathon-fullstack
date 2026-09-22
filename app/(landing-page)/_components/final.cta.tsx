export function FinalCta() {
  return (
    <section
      id="apoia-se"
      className="relative overflow-hidden bg-primary text-primary-foreground"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-7 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div>
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
            Bora manter isso de pé?
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-primary-foreground/80">
            R$ 2 hoje, cancelável amanhã, impacto que fica. A campanha
            oficial está no Apoia.se.
          </p>
        </div>

        <a
          href="https://apoia.se/soujunior"
          target="_blank"
          rel="noopener"
          className="inline-flex shrink-0 items-center bg-navy px-8 py-5 text-base font-bold tracking-[0.04em] text-background no-underline uppercase hover:opacity-90"
        >
          Apoiar a SouJunior
        </a>
      </div>
    </section>
  )
}
