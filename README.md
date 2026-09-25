# SouJunior

**Plataforma open-source de mentoria e aceleração de carreira para desenvolvedores juniores brasileiros.**

Projetos reais, mentoria gratuita e a primeira oportunidade de milhares de devs — mantida pela própria comunidade, começando com R$ 2/mês.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router, RSC) |
| UI | React 19 + TypeScript 5 + Tailwind v4 |
| Componentes | shadcn/ui `base-nova` (`@base-ui/react`) |
| Banco de dados | Supabase — PostgreSQL 17 |
| Autenticação | Supabase Auth — e-mail/senha + Google OAuth |
| Visualização 3D | Three.js + `@react-three/fiber` |
| Testes | Vitest (unitários) · Playwright (E2E) |
| Deploy | Vercel |

---

## Status

| Área | Estado |
|------|--------|
| Landing page | Implementada |
| Autenticação (e-mail + Google OAuth) | Implementada |
| Dashboard | Em desenvolvimento |
| Migrações de banco de dados | Não iniciadas |
| CI/CD | Não configurado |

---

## Início rápido

**Pré-requisitos:** Node.js 20+, Docker Desktop (para o Supabase local).

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o Supabase local (Docker deve estar em execução)
npx supabase start

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Preencha .env.local com os valores impressos pelo comando acima

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

> Instruções detalhadas de configuração, variáveis de ambiente e Supabase local: [`docs/setup.md`](docs/setup.md)

---

## Scripts disponíveis

```bash
npm run dev          # servidor com hot reload
npm run build        # build de produção
npm run start        # inicia o build de produção
npm run lint         # ESLint
npm run typecheck    # TypeScript sem emissão
npm run test         # Vitest (watch)
npm run test:run     # Vitest (single run)
npm run test:e2e     # Playwright
npm run seed:users   # popula usuários de teste no Supabase local
```

---

## Estrutura do projeto

```
app/
  (landing-page)/     landing page pública
  (platform)/         rotas autenticadas (login, dashboard, admin, perfil)
  api/auth/           callbacks de OAuth e OTP
  dev/                rotas exclusivas de desenvolvimento (404 em produção)
components/
  ui/                 primitivos shadcn (onde o tema vive)
  common/             compostos reutilizáveis (PageHeader, EmptyState…)
  <feature>/          componentes acoplados a uma feature
docs/                 documentação técnica detalhada
lib/                  utilitários, clientes Supabase, validações
hooks/                lógica reutilizável (React hooks)
supabase/             migrações e configuração local
```

---

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [`docs/architecture.md`](docs/architecture.md) | Diagrama do sistema, App Router, decisões técnicas |
| [`docs/setup.md`](docs/setup.md) | Pré-requisitos, variáveis de ambiente, Supabase local |
| [`docs/auth.md`](docs/auth.md) | Fluxos de autenticação, proteção de rotas por role, OAuth |
| [`docs/routes.md`](docs/routes.md) | Inventário completo de rotas, APIs e páginas de erro |
| [`docs/design-system.md`](docs/design-system.md) | Componentes, tokens CSS, convenções de estilo |
| [`docs/database.md`](docs/database.md) | Supabase local, configurações, migrações |
| [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) | Sistema Industry — fonte primária de estilo |

---

## Convenções importantes

### `proxy.ts` em vez de `middleware.ts`

Next.js 16 renomeou o arquivo de interceptação de requests. O arquivo chama-se `proxy.ts` e exporta a função `proxy` (não `middleware`). Detalhes em [`docs/architecture.md`](docs/architecture.md).

### shadcn `base-nova`

Este projeto usa o estilo `base-nova` do shadcn, que substitui Radix UI por `@base-ui/react`. A API dos componentes difere:

- Composição via prop `render` em vez de `asChild`
- Atributos de estado como `data-checked` e `data-open` em vez de variantes Radix

Ver [`docs/design-system.md`](docs/design-system.md).

### Sistema Industry

Design minimalista: cantos retos (`rounded-none`), cards como desenhos de linha, acento único em steel blue (`#5980a6`). Ícones Lucide com `strokeWidth={1.5}` em todos os casos. Ver [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).

### Idioma

Toda a interface, mensagens de erro e e-mails estão em português (pt-BR).

---

## Preview de componentes

Em ambiente de desenvolvimento, acesse `http://localhost:3000/dev/design-system` para o catálogo interativo com todos os componentes shadcn, tokens do sistema Industry e variantes disponíveis.

---

## Licença

[MIT](LICENSE)
