---
description: Analisa as mudanças recentes do projeto, identifica código sem cobertura de testes e cria ou atualiza testes unitários conforme necessário.
allowed-tools: Bash(git log *), Bash(git diff *), Bash(git show *), Bash(git status *), Bash(npx vitest run *), Read, Write, Edit, Glob, Grep
---

Você é responsável por manter a suíte de testes sincronizada com o código. Siga as etapas abaixo sem pular nenhuma.

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
- `lib/` — utilitários, lógica de negócio, validações
- `app/api/` — Route Handlers
- `app/**/actions.ts` ou `app/**/_lib/` — Server Actions
- `components/` — componentes React
- `hooks/` — React hooks
- `proxy.ts` — interceptação de requests
- Outros

## Etapa 2 — Ler os testes existentes

Para cada arquivo de código relevante modificado na Etapa 1:

1. Verifique se existe um arquivo de teste correspondente em `<mesmo-diretório>/__tests__/<nome>.test.ts` (ou `.tsx`).
2. Leia o arquivo de teste se existir.
3. Leia o arquivo de código-fonte para entender contratos públicos: funções exportadas, tipos, comportamentos esperados.

Foque apenas em arquivos que **valem a pena testar** (veja mapeamento abaixo). Não gaste tempo com arquivos irrelevantes para testes.

## Etapa 3 — Classificar cada arquivo modificado

Para cada arquivo modificado na Etapa 1, determine:

1. **Coberto:** o teste existente já exercita o comportamento modificado — nenhuma ação necessária.
2. **Desatualizado:** o teste existe mas não cobre a mudança (nova função, parâmetro adicionado, comportamento alterado, função removida com teste órfão).
3. **Ausente:** código testável sem nenhum teste — o arquivo `__tests__/` não existe ou não cobre essa unidade.
4. **Irrelevante:** a mudança não merece testes unitários (veja lista abaixo).

Produza uma tabela com cada arquivo e sua classificação. Para "Desatualizado" e "Ausente", especifique o que precisa ser criado ou atualizado.

### O que vale a pena testar (unitariamente)

| Tipo de arquivo | Testar? | Observação |
|-----------------|---------|------------|
| `lib/**/*.ts` — funções puras | Sim | Prioridade máxima |
| `lib/validations/` — schemas Zod | Sim | Cobrir casos válidos, inválidos e edge cases |
| `lib/auth/` — helpers de auth | Sim | |
| `app/api/**/route.ts` — Route Handlers | Sim | Mock do Supabase; teste os redirecionamentos |
| `app/**/_lib/server/actions.ts` — Server Actions | Sim (se possível) | Mock de `next/navigation` e `next/headers` quando necessário |
| `hooks/` — React hooks | Sim (se não depender de browser API) | |
| `components/` — React components | Não | Cobertos por testes E2E em `e2e/`; não criar testes unitários de componentes a menos que o usuário peça |
| `app/**/_components/` | Não | Mesma razão acima |
| `app/**/_data/` | Não | Dados estáticos, sem lógica |
| `supabase/`, `next.config.ts`, `.env` | Não | Configuração |
| Arquivos de estilo, ícones, assets | Não | |

### O que NÃO fazer

- Criar testes que apenas verificam se uma função retorna o que foi passado (tautologia).
- Mockar o próprio módulo sendo testado.
- Criar testes de snapshot de componentes React.
- Usar `any` ou `@ts-ignore` para fazer o teste compilar.
- Adicionar comentários em código — siga `CLAUDE.local.md`.

## Etapa 4 — Aplicar as atualizações

Para cada lacuna do tipo "Desatualizado" ou "Ausente":

### Antes de escrever

1. Leia o arquivo de código-fonte completamente.
2. Liste mentalmente os contratos públicos: cada função exportada, seus parâmetros, retornos e casos de erro.
3. Para cada contrato, identifique: caminho feliz, entrada inválida, edge cases, comportamento de erro.

### Convenções obrigatórias (padrão do projeto)

- **Framework:** Vitest com `globals: true` — importe `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach` de `"vitest"`.
- **Localização:** `<diretório-do-módulo>/__tests__/<nome-do-módulo>.test.ts`
- **Idioma:** descrições de `describe` e `it` em português (pt-BR), igual aos testes existentes.
- **Mocks:** use `vi.hoisted()` + `vi.mock()` para dependências externas (Supabase, `next/navigation`, `next/headers`). Declare o mock antes do import do módulo sendo testado.
- **Imports no teste:** use caminho relativo para o módulo sendo testado (`"../nome"`); use aliases `@lib/*` para dependências auxiliares.
- **Sem comentários** — siga `CLAUDE.local.md`.

### Exemplo de estrutura (Route Handler com mock)

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockFn = vi.hoisted(() => vi.fn());

vi.mock("@lib/supabase/server", () => ({
  createClient: () => Promise.resolve({ auth: { algumMetodo: mockFn } }),
}));

import { GET } from "../route";

describe("GET /api/exemplo", () => {
  beforeEach(() => { mockFn.mockResolvedValue({ error: null }); });
  afterEach(() => { vi.clearAllMocks(); });

  it("redireciona para /dashboard em sucesso", async () => {
    const req = new Request("http://localhost/api/exemplo?code=abc");
    const res = await GET(req);
    expect(res.headers.get("location")).toBe("http://localhost/dashboard");
  });
});
```

### Ao editar testes existentes

- Use `Edit` para adicionar casos a um `describe` existente — não reescreva o arquivo inteiro.
- Não remova testes que ainda são válidos.
- Se uma função foi removida, remova o `describe` correspondente.

### Ao criar um novo arquivo de teste

- Use `Write` para criar o arquivo completo.
- Inclua todos os `describe` de uma vez — não crie um arquivo com apenas um caso e planeje completar depois.

## Etapa 5 — Executar os testes

Após criar ou editar qualquer arquivo de teste, execute:

```
npx vitest run --reporter=verbose
```

Se houver falhas:
1. Leia a mensagem de erro completa.
2. Leia o código-fonte relevante novamente para entender o comportamento real.
3. Corrija o teste (ou, se o teste revelar um bug real no código, reporte ao usuário antes de corrigir o código).
4. Execute novamente até todos os testes passarem.

Não declare o trabalho concluído se houver testes falhando.

## Etapa 6 — Relatório final

Ao terminar, apresente:

1. **Mudanças analisadas** — quantos commits, quais arquivos de código foram avaliados.
2. **Testes criados** — lista de novos arquivos `__tests__/*.test.ts` com o que cada um cobre.
3. **Testes atualizados** — lista de arquivos existentes modificados e o que foi adicionado/removido.
4. **Itens ignorados** — arquivos classificados como "Irrelevantes" e por quê.
5. **Lacunas que permanecem** — código que não pôde ser testado (ex.: Server Actions com dependências difíceis de mockar) — explique o motivo e sugira abordagem alternativa (ex.: cobrir via E2E).

Seja objetivo: liste apenas o que mudou, não o que ficou igual.
