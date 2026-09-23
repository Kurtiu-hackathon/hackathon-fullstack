export function FinalCta() {
  return (
    <section
      id="apoia-se"
      className="bg-primary text-primary-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-7 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div>
          <h2 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
            Bora manter isso de pé?
          </h2>

          <p className="mt-4 max-w-xl font-body text-base leading-7 text-primary-foreground/80">
            R$ 2 hoje, cancelável amanhã, impacto que fica. A campanha
            oficial está no Apoia.se.
          </p>
        </div>

        <a
          href="https://apoia.se/soujunior"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center border border-primary-foreground bg-transparent px-8 py-5 font-heading text-base font-semibold tracking-[0.04em] text-primary-foreground no-underline uppercase transition-colors hover:bg-primary-foreground hover:text-primary"
        >
          Apoiar a SouJunior
        </a>
      </div>
    </section>
  )
}
