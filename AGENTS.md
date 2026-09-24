<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# CLAUDE.md

Instruções de trabalho para este repositório. Leia antes de qualquer alteração de frontend.

## Stack

React + TypeScript + Tailwind + **shadcn/ui**. Design system: **Industry** (ver `DESIGN-SYSTEM.md`).
Ícones: **Lucide**, sempre `strokeWidth={1.5}`.

## Regra nº 1 — shadcn primeiro

Antes de escrever qualquer componente de UI, procure nesta ordem:

1. Já existe em `components/ui/`? Use.
2. Existe no catálogo do shadcn/ui? Instale (`npx shadcn@latest add <componente>`) e ajuste aos tokens do Industry.
3. Dá para compor com dois ou três componentes shadcn existentes? Componha.
4. Só então crie do zero — e justifique em uma linha no PR/resposta por que os passos 1–3 não serviam.

Componente novo do zero é exceção, não default. Nunca reimplemente algo que o shadcn já entrega (dialog, dropdown, popover, tooltip, tabs, accordion, sheet, command, form, table, calendar, toast, etc.).

### Nunca faça
- Criar um `MyButton`/`CustomCard` que envolve o `Button`/`Card` só para aplicar classes. Ajuste o **variant** no arquivo original de `components/ui/`.
- Instalar biblioteca de UI concorrente (MUI, Chakra, Ant, Mantine, react-bootstrap).
- Reimplementar comportamento acessível (foco preso, ESC, aria) que o Radix já resolve.
- CSS-in-JS, styled-components, arquivos `.css` por componente. Tailwind + tokens, só.

## Estrutura

```
components/ui/        primitivos shadcn (editáveis — é aqui que o tema vive)
components/common/    compostos reutilizáveis do produto (PageHeader, EmptyState, DataCard…)
components/<feature>/ componentes acoplados a uma feature
app/ | src/pages/     rotas — montagem, não estilo
lib/utils.ts          cn() e helpers
hooks/                lógica reutilizável
```

Regra de promoção: um componente nasce dentro da feature. Na **terceira** utilização em features diferentes, promova para `components/common/`. Não antecipe.

## Como escrever um componente

- Função nomeada + `export function`, não default export.
- Props tipadas estendendo o elemento nativo: `React.ComponentProps<"div">` ou `ComponentProps<typeof Button>`.
- Sempre aceite e mescle `className` via `cn()`. Sempre repasse `...props`.
- Variações via **`cva`** (`class-variance-authority`), como o shadcn faz — não via `if` retornando JSX diferente.
- Encaminhe `ref` quando o componente embrulha um elemento focável.
- Nada de props booleanas empilhadas (`isPrimaryLarge`); use `variant` + `size`.
- Componente com mais de ~150 linhas ou mais de uma responsabilidade: quebre.
- Estado local fica local. Lógica de dados sai para hook (`useX`), não para dentro do JSX.

```tsx
export function DataCard({ className, title, children, ...props }: DataCardProps) {
  return (
    <Card className={cn("gap-3", className)} {...props}>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
```

## Estilo

- Cores, fontes, espaçamento e raio **sempre** por token (`var(--color-*)`, classes do Tailwind mapeadas). Nunca hex solto, nunca `text-[#5980a6]`.
- Cantos retos (`rounded-none`) é o default do sistema. Card é desenho de linha: fundo transparente, borda hairline, marcas de registro nos cantos.
- Um único acento (aço `#5980a6`). Sem gradiente, sem segunda cor decorativa, sem emoji.
- Layout com flex/grid + `gap`. Nada de margens empilhadas para espaçar irmãos.
- Mobile-first; componente é fluido por padrão (`max-width`, não `width` fixo).
- Estados (hover, active, focus-visible, disabled) vêm do tema — não redefina por página.

## Páginas de file-system conventions (error.tsx, not-found.tsx, loading.tsx…)

O fundo dessas páginas deve ser idêntico ao do Hero da landing page: `bg-navy` com grid de 64 px formado por dois `linear-gradient` usando `var(--primary)` a 8% de opacidade.

```tsx
<div
  className="flex min-h-screen flex-col bg-navy"
  style={{
    backgroundImage:
      "linear-gradient(color-mix(in srgb,var(--primary) 8%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--primary) 8%,transparent) 1px,transparent 1px)",
    backgroundSize: "64px 64px",
  }}
>
```

Não use outros padrões de fundo (colunas repetidas, gradientes radiais, `repeating-linear-gradient`) nessas páginas.

## Formulários

`react-hook-form` + `zod` + os componentes `Field` do shadcn. Sempre. Sem estado manual de campo, sem validação ad-hoc no submit.

## Acessibilidade

- HTML semântico antes de ARIA. `<button>` para ação, `<a>` para navegação.
- Todo controle interativo alcançável por teclado, com foco visível (anel de 2px do acento).
- Alvo de toque mínimo 44px em mobile.
- Texto de corpo com contraste ≥ 4.5:1 — o acento puro não passa; use `--accent-700` ou mais escuro.
- `alt` em imagem com conteúdo; `alt=""` em decorativa.

## Qualidade

- TypeScript estrito: sem `any`, sem `@ts-ignore` sem comentário explicando.
- Sem `console.log` em código commitado.
- Rode lint e type-check antes de declarar concluído.
- Ao terminar uma alteração, liste o que mudou por arquivo. Não descreva o que não mudou.

## Escopo

Faça o que foi pedido. Se identificar melhoria fora do escopo, **sugira** ao final em vez de aplicar. Não refatore, não renomeie, não "melhore" arquivos que o pedido não tocava.

