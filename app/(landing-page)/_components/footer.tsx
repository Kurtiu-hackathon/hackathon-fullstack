export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <a
            href="#inicio"
            className="font-bold text-foreground no-underline"
          >
            SouJunior
          </a>

          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Comunidade brasileira que abre a primeira porta de
            carreira em tecnologia.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold">
            Apoio
          </h3>

          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="#apoia-se">Apoia.se</a>
            <a href="#niveis">Níveis de apoio</a>
            <a href="#">Relatórios</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold">
            Comunidade
          </h3>

          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="#">Discord</a>
            <a href="#">WhatsApp</a>
            <a href="#">GitHub</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold">
            SouJunior
          </h3>

          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="#">soujunior.tech</a>
            <a href="#">Seja voluntário</a>
          </div>
        </div>
      </div>
    </footer>
  )
}