import { Blueprint } from "@/components/ui/blueprint"

import { forumData } from "../_data/forum"

export function Forum() {
  return (
    <section
      id="forum"
      className="mt-12"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Fórum
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Conversas em {forumData.category}
          </h2>
        </div>

        <a
          href="#publicar"
          className="inline-flex min-h-12 items-center justify-center bg-primary px-5 text-sm font-bold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          Nova conversa em {forumData.category}
        </a>
      </div>

      <Blueprint className="mt-6 p-6 sm:p-8">
        <a
          id="publicar"
          href="#"
          className="flex min-h-14 items-center justify-center border border-foreground px-6 text-sm font-medium text-foreground no-underline transition-colors hover:bg-foreground hover:text-background"
        >
          Publicar no fórum
        </a>

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Moderadores de {forumData.category}
          </p>

          <div className="mt-5 space-y-5">
            {forumData.moderators.map((moderator) => (
              <div
                key={moderator.initials}
                className="flex items-center gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">
                  {moderator.initials}
                </div>

                <div>
                  <p className="font-bold">
                    {moderator.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {moderator.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Blueprint>
    </section>
  )
}