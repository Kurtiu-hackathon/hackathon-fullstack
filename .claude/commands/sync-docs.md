---
description: Analisa as mudanças recentes do projeto, identifica lacunas na documentação e atualiza docs/ conforme necessário.
allowed-tools: Bash(git log *), Bash(git diff *), Bash(git show *), Bash(git status *), Bash(git stash list *), Read, Write, Edit, Glob, Grep
---

Você é responsável por manter a documentação de `docs/` sincronizada com o código. Siga as etapas abaixo sem pular nenhuma.

## Etapa 1 — Determinar o escopo das mudanças

Execute os seguintes comandos git e analise os resultados:

```
git log --oneline -20
git diff HEAD~$COMMITS_BACK..HEAD --name-only --diff-filter=ACDMR
git diff HEAD~$COMMITS_BACK..HEAD --stat
```

Se o usuário informou um número de commits ou um sha/range como argumento (`$ARGUMENTS`), use-o como `$COMMITS_BACK`. Caso contrário, use `HEAD~10..HEAD` como janela padrão.

Se o argumento for um nome de branch (`git diff <branch>..HEAD`), adapte o comando.

Produza uma lista dos arquivos modificados, agrupados por área:
- `app/` — rotas e páginas
- `components/` — componentes
- `lib/` — utilitários e lógica
- `supabase/` — banco de dados e configurações
- `proxy.ts` — interceptação de requests
- `next.config.ts` / `tsconfig.json` / `package.json` — configuração
- Outros

## Etapa 2 — Ler o estado atual da documentação

Leia todos os arquivos de `docs/` e o `README.md`. Mapeie quais seções de quais arquivos cobrem cada área do projeto.

Estrutura de docs esperada:
- `docs/architecture.md` — diagrama, App Router, decisões técnicas, Next.js 16, Supabase
- `docs/setup.md` — pré-requisitos, variáveis de ambiente, comandos
- `docs/auth.md` — fluxos de auth, proteção de rotas, schemas
- `docs/routes.md` — inventário de rotas, API routes
- `docs/design-system.md` — componentes, tokens, camadas
- `docs/database.md` — banco de dados, migrações, Supabase config
- `README.md` — portal de entrada

## Etapa 3 — Identificar lacunas

Para cada arquivo modificado na Etapa 1, determine:

1. **Coberto:** a mudança já está refletida na documentação existente.
2. **Desatualizado:** a documentação existe mas não reflete a mudança (ex.: rota removida ainda listada, variável renomeada, comportamento alterado).
3. **Ausente:** a mudança introduz algo novo que não está documentado em lugar algum.
4. **Irrelevante:** a mudança não afeta nenhuma doc (ex.: refatoração interna sem mudança de interface, ajuste de estilo).

Produza uma tabela com cada arquivo modificado e sua classificação. Para os casos "Desatualizado" e "Ausente", especifique qual documento e qual seção precisam ser criados ou atualizados.

## Etapa 4 — Aplicar as atualizações

Para cada lacuna do tipo "Desatualizado" ou "Ausente":

- Leia o código relevante antes de escrever qualquer documentação.
- Use apenas fatos confirmados no código — nunca suponha comportamento pelo nome de arquivo ou variável.
- Marque explicitamente como **"Não verificado"** qualquer coisa que não pôde ser confirmada diretamente no código.
- Edite o arquivo de doc correspondente usando `Edit` para seções existentes ou `Write` se o arquivo não existir.
- Não reescreva seções que não foram afetadas pelas mudanças.
- Mantenha o idioma existente do documento (português).
- Não inclua comentários em código — siga `CLAUDE.local.md`.

### Mapeamento padrão: mudança → documento

| Área do código | Documentos a verificar |
|----------------|------------------------|
| Nova rota / página removida | `docs/routes.md`, `README.md` |
| Novo componente em `components/ui/` | `docs/design-system.md` |
| Componente promovido para `components/common/` | `docs/design-system.md` |
| Mudança em `lib/auth/` | `docs/auth.md` |
| Mudança em `lib/supabase/` | `docs/auth.md`, `docs/architecture.md` |
| Mudança em `lib/validations/` | `docs/auth.md` |
| Mudança em `proxy.ts` | `docs/auth.md`, `docs/architecture.md` |
| Nova migration em `supabase/migrations/` | `docs/database.md` |
| Mudança em `supabase/config.toml` | `docs/database.md`, `docs/setup.md` |
| Nova variável de ambiente | `docs/setup.md`, `README.md` |
| Nova dependência em `package.json` | `docs/architecture.md` |
| Mudança em `next.config.ts` | `docs/architecture.md` |
| Mudança em `app/layout.tsx` | `docs/architecture.md` |
| Novo script em `package.json` | `docs/setup.md` |

## Etapa 5 — Relatório final

Ao terminar, apresente:

1. **Mudanças analisadas** — quantos commits, quais arquivos.
2. **Documentação atualizada** — lista de arquivos de doc modificados e o que foi alterado em cada um.
3. **Itens ignorados** — mudanças classificadas como "Irrelevantes" e por quê.
4. **Lacunas que permanecem** — o que não pôde ser documentado por falta de informação (marque como "Não verificado" e explique o motivo).

Seja objetivo: liste apenas o que mudou, não o que ficou igual.
