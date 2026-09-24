"use client"

import { useState } from "react"
import { Blueprint } from "@/components/ui/blueprint"
import { cn } from "cn"

type CommunityId = "dev" | "devops" | "data" | "pm" | "qa" | "ux" | "agile" | "livro"

type Thread = {
  tag: string
  author: string
  when: string
  title: string
  excerpt: string
  replies: number
  likes: number
}

type Moderator = {
  initials: string
  name: string
  role: string
}

const COMMUNITIES: { id: CommunityId; name: string; count: number }[] = [
  { id: "dev", name: "Dev", count: 412 },
  { id: "devops", name: "DevOps", count: 138 },
  { id: "data", name: "Data", count: 196 },
  { id: "pm", name: "PM - Produtos", count: 174 },
  { id: "qa", name: "QA", count: 121 },
  { id: "ux", name: "UX", count: 263 },
  { id: "agile", name: "Agile", count: 109 },
  { id: "livro", name: "Clube do Livro", count: 87 },
]

const THREADS: Record<CommunityId, Thread[]> = {
  dev: [
    { tag: "Dúvida", author: "Rafa M.", when: "há 2h", title: "Vale começar por React ou fundamentos de JS?", excerpt: "Tô na dúvida se pulo pro framework ou seguro mais um mês em JS puro.", replies: 18, likes: 24 },
    { tag: "Code review", author: "Bia T.", when: "há 6h", title: "Alguém revisa meu PR no projeto de vagas?", excerpt: "Primeira contribuição no repo soujunior/vagas. Feedback bruto é bem-vindo.", replies: 9, likes: 15 },
    { tag: "Vaga", author: "Léo K.", when: "ontem", title: "Estágio front-end remoto — indicação aberta", excerpt: "Meu time abriu duas vagas de estágio. Indico quem tiver portfólio revisado aqui.", replies: 31, likes: 58 },
  ],
  devops: [
    { tag: "Tutorial", author: "Nina P.", when: "há 4h", title: "Pipeline grátis no GitHub Actions pra projeto júnior", excerpt: "Montei um template de CI que roda lint, test e deploy sem custo.", replies: 12, likes: 33 },
    { tag: "Dúvida", author: "Caio R.", when: "há 1d", title: "Docker compose quebrando no Windows", excerpt: "Erro de volume no WSL2, alguém já passou por isso?", replies: 7, likes: 8 },
  ],
  data: [
    { tag: "Projeto", author: "Sofia A.", when: "há 1h", title: "Squad de dados abertos: kickoff dia 29", excerpt: "Vamos cruzar dados de empregabilidade júnior. Precisamos de 2 pessoas em ETL.", replies: 22, likes: 41 },
    { tag: "Dúvida", author: "Igor L.", when: "há 9h", title: "SQL ou Python primeiro pra análise?", excerpt: "Quero montar um portfólio de análise em 3 meses.", replies: 14, likes: 19 },
  ],
  pm: [
    { tag: "Discussão", author: "Ana C.", when: "há 3h", title: "Como escrever um PRD sem virar romance", excerpt: "Compartilhei meu template de PRD de uma página. Feedback bem-vindo.", replies: 17, likes: 29 },
  ],
  qa: [
    { tag: "Tutorial", author: "Mari F.", when: "há 5h", title: "Cypress vs Playwright em 2024", excerpt: "Fiz um comparativo honesto depois de usar os dois em projetos reais.", replies: 11, likes: 22 },
  ],
  ux: [
    { tag: "Portfólio", author: "Gabi S.", when: "há 2h", title: "Feedback no meu case de redesign", excerpt: "Redesenhei o fluxo de onboarding de um app. Adoraria um olhar externo.", replies: 8, likes: 16 },
  ],
  agile: [
    { tag: "Discussão", author: "Thais R.", when: "ontem", title: "Retro que ninguém dorme", excerpt: "Formatos novos de retrospectiva que funcionam de verdade.", replies: 14, likes: 27 },
  ],
  livro: [
    { tag: "Encontro", author: "Paulo B.", when: "há 1h", title: "Clube do Livro: capítulos 4-6 de Team Topologies", excerpt: "Resumo da leitura e pontos para discussão no encontro de quinta.", replies: 6, likes: 12 },
  ],
}

const MODERATORS: Record<CommunityId, Moderator[]> = {
  dev: [
    { initials: "LM", name: "Lucas M.", role: "Dev · 3 anos" },
    { initials: "CR", name: "Cláudia R.", role: "Dev · 2 anos" },
    { initials: "PB", name: "Paulo B.", role: "Dev · 1 ano" },
  ],
  devops: [
    { initials: "NP", name: "Nina P.", role: "DevOps · 2 anos" },
  ],
  data: [
    { initials: "SA", name: "Sofia A.", role: "Data · 2 anos" },
    { initials: "IL", name: "Igor L.", role: "Data · 1 ano" },
  ],
  pm: [
    { initials: "AC", name: "Ana C.", role: "PM · 3 anos" },
  ],
  qa: [
    { initials: "MF", name: "Mari F.", role: "QA · 2 anos" },
  ],
  ux: [
    { initials: "GS", name: "Gabi S.", role: "UX · 2 anos" },
  ],
  agile: [
    { initials: "TR", name: "Thais R.", role: "Agile · 3 anos" },
  ],
  livro: [
    { initials: "PB", name: "Paulo B.", role: "Dev · 1 ano" },
  ],
}

export function DashboardForum() {
  const [activeCommunity, setActiveCommunity] = useState<CommunityId>("dev")
  const active = COMMUNITIES.find((c) => c.id === activeCommunity)!

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-heading text-[19px] font-bold">Fórum da comunidade</h2>
        <span className="text-[12.5px] text-muted-foreground">
          {COMMUNITIES.length} comunidades · moderação voluntária
        </span>
      </div>

      <div className="mb-[22px] flex flex-wrap gap-2">
        {COMMUNITIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCommunity(c.id)}
            className={cn(
              "border px-3 py-1.5 text-[13px] transition-colors",
              c.id === activeCommunity
                ? "border-foreground bg-transparent text-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {c.name} · {c.count}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(14px,2vw,22px)]">
        <div className="flex flex-col gap-3">
          {THREADS[activeCommunity].map((t) => (
            <Blueprint
              key={t.title}
              className="flex flex-col gap-2.5 p-[18px]"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <span className="bg-[var(--accent-200)] px-1.5 py-0.5 text-[var(--accent-800)]">
                  {t.tag}
                </span>
                <span>{t.author}</span>
                <span>· {t.when}</span>
              </div>
              <h3 className="font-heading text-[16.5px] font-semibold leading-snug">
                {t.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-muted-foreground">
                {t.excerpt}
              </p>
              <div className="flex gap-4 text-[12.5px] text-primary">
                <span>{t.replies} respostas</span>
                <span>{t.likes} curtidas</span>
              </div>
            </Blueprint>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <Blueprint className="p-[18px]">
            <div className="mb-2.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Nova conversa em {active.name}
            </div>
            <input
              type="text"
              placeholder="Título da sua dúvida"
              className="mb-2.5 w-full border border-border bg-transparent px-3 py-2.5 text-[14px] font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              placeholder="Conta o contexto — o que você já tentou?"
              rows={4}
              className="w-full resize-y border border-border bg-transparent px-3 py-2.5 text-[14px] font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              className="mt-2.5 w-full border border-foreground bg-transparent px-3 py-2.5 font-heading text-[12.5px] uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              Publicar
            </button>
          </Blueprint>

          <Blueprint className="p-[18px]">
            <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Moderadores de {active.name}
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {MODERATORS[activeCommunity].map((m) => (
                <div key={m.name} className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[var(--accent-200)] font-heading text-[10px] text-[var(--accent-800)]">
                    {m.initials}
                  </div>
                  <div>
                    <strong>{m.name}</strong>{" "}
                    <span className="text-muted-foreground">· {m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </Blueprint>
        </div>
      </div>
    </section>
  )
}
