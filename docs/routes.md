# Inventário de rotas

## Tabela de rotas

| Caminho | Tipo | Proteção | Arquivo principal |
|---------|------|----------|-------------------|
| `/` | Page | Pública | `app/(landing-page)/page.tsx` |
| `/login` | Page | Pública | `app/(platform)/login/page.tsx` |
| `/dashboard` | Page | Auth obrigatória | `app/(platform)/dashboard/page.tsx` |
| `/dashboard/overview` | Page | Auth obrigatória | `app/(platform)/dashboard/overview/page.tsx` |
| `/dashboard/events` | Page | Auth obrigatória | `app/(platform)/dashboard/events/page.tsx` |
| `/dashboard/awards` | Page | Auth obrigatória | `app/(platform)/dashboard/awards/page.tsx` |
| `/dashboard/forum` | Page | Auth obrigatória | `app/(platform)/dashboard/forum/page.tsx` |
| `/admin` | Page | Role `ADMIN` | `app/(platform)/admin/page.tsx` |
| `/admin/overview` | Page | Role `ADMIN` | `app/(platform)/admin/overview/page.tsx` |
| `/admin/users` | Page | Role `ADMIN` | `app/(platform)/admin/users/page.tsx` |
| `/admin/posts` | Page | Role `ADMIN` | `app/(platform)/admin/posts/page.tsx` |
| `/admin/events` | Page | Role `ADMIN` | `app/(platform)/admin/events/page.tsx` |
| `/admin/finance` | Page | Role `ADMIN` | `app/(platform)/admin/finance/page.tsx` |
| `/super-admin` | Page | Role `SUPER_ADMIN` | `app/(platform)/super-admin/page.tsx` |
| `/super-admin/overview` | Page | Role `SUPER_ADMIN` | `app/(platform)/super-admin/overview/page.tsx` |
| `/super-admin/users` | Page | Role `SUPER_ADMIN` | `app/(platform)/super-admin/users/page.tsx` |
| `/super-admin/posts` | Page | Role `SUPER_ADMIN` | `app/(platform)/super-admin/posts/page.tsx` |
| `/super-admin/events` | Page | Role `SUPER_ADMIN` | `app/(platform)/super-admin/events/page.tsx` |
| `/super-admin/finance` | Page | Role `SUPER_ADMIN` | `app/(platform)/super-admin/finance/page.tsx` |
| `/super-admin/audit` | Page | Role `SUPER_ADMIN` | `app/(platform)/super-admin/audit/page.tsx` |
| `/moderator` | Page | Role `MODERATOR` | `app/(platform)/moderator/page.tsx` |
| `/moderator/overview` | Page | Role `MODERATOR` | `app/(platform)/moderator/overview/page.tsx` |
| `/moderator/posts` | Page | Role `MODERATOR` | `app/(platform)/moderator/posts/page.tsx` |
| `/moderator/events` | Page | Role `MODERATOR` | `app/(platform)/moderator/events/page.tsx` |
| `/profile` | Page | Auth obrigatória | `app/(platform)/profile/page.tsx` |
| `/api/auth/callback` | Route Handler | Pública | `app/api/auth/callback/route.ts` |
| `/api/auth/confirm` | Route Handler | Pública | `app/api/auth/confirm/route.ts` |
| `/dev/design-system` | Page | Dev only | `app/dev/design-system/page.tsx` |
| `/dev/error` | Page | Dev only | `app/dev/error/page.tsx` |
| `/dev/notfound` | Page | Dev only | `app/dev/notfound/page.tsx` |
| `/dev/unauthorized` | Page | Dev only | `app/dev/unauthorized/page.tsx` |
| `/dev/forbidden` | Page | Dev only | `app/dev/forbidden/page.tsx` |
| `/dev/loading` | Page | Dev only | `app/dev/loading/page.tsx` |

## Páginas de erro do sistema

Estas páginas são servidas automaticamente pelo Next.js para erros globais. Todas usam o padrão de fundo `bg-navy` com grid definido em `CLAUDE.md`.

| Arquivo | HTTP | Quando é exibida |
|---------|------|-----------------|
| `app/error.tsx` | 500 | Erros não tratados em Server Components |
| `app/not-found.tsx` | 404 | Rota não encontrada |
| `app/unauthorized.tsx` | 401 | Usuário não autenticado (via `authInterrupts`) |
| `app/forbidden.tsx` | 403 | Usuário autenticado sem permissão |
| `app/loading.tsx` | — | Suspense global durante carregamento |

## Query params aceitos por `/login`

| Param | Valores | Descrição |
|-------|---------|-----------|
| `mode` | `signin` \| `signup` \| `forgot` \| `update` | Modo da tela (padrão: `signin`) |
| `next` | path relativo | Para onde redirecionar após login |
| `error` | string | Código de erro a exibir |
| `password_updated` | `1` | Exibe confirmação de senha atualizada |

## Rotas de API

### `GET /api/auth/callback`

Handler OAuth. Recebe o código de autorização do provedor externo (Google) e o troca por uma sessão Supabase.

| Param | Obrigatório | Descrição |
|-------|-------------|-----------|
| `code` | Sim | Código de autorização OAuth |
| `next` | Não | Path para redirecionar após autenticação |

**Sucesso:** redireciona para `next` se fornecido e válido; caso contrário, redireciona para a rota correspondente à role do usuário via `getDashboardByRole()` (ex.: `SUPER_ADMIN` → `/super-admin`, sem role → `/dashboard`).
**Erro:** redireciona para `/login?error=oauth_callback`.

### `GET /api/auth/confirm`

Handler de OTP por e-mail. Usado para confirmação de cadastro e recuperação de senha.

| Param | Obrigatório | Valores | Descrição |
|-------|-------------|---------|-----------|
| `token_hash` | Sim | hash do token | Token enviado por e-mail |
| `type` | Sim | `email` \| `recovery` | Tipo de confirmação |
| `next` | Não | path relativo | Path para redirecionar após confirmação |

**Sucesso:** redireciona para `next` (ou `/dashboard`).
**Erro (recovery):** redireciona para `/login?mode=forgot&error=recovery_link_invalid`.
**Erro (email):** redireciona para `/login?error=email_confirmation`.

## Grupos do App Router

### `(landing-page)`

Layout simples; sem autenticação. Contém a landing page pública com seções: Hero, Ticker, Cause, Allocation, Impact, Plans, Testimonials, Transparency, Ecosystem, FAQ, FinalCTA.

### `(platform)`

Rotas do produto. Subdiretório `login/` é público; `dashboard/` é protegido por `DashboardLayout` (dupla verificação junto com `proxy.ts`); `admin/`, `super-admin/` e `moderator/` são protegidos por role; `profile/` é protegido por auth mas acessível a qualquer role autenticada e renderiza o shell adequado à role do usuário — ver `docs/auth.md#proteção-de-rotas-por-role`.

### `dev/`

Protegido por `app/dev/layout.tsx` que retorna `notFound()` quando `NODE_ENV !== "development"`. Em produção, qualquer rota `/dev/*` resulta em 404.

## Rota `/dev/design-system`

Catálogo interativo com todos os 63 componentes shadcn, tokens do sistema Industry e variantes disponíveis. Acessível apenas em desenvolvimento (`npm run dev`).

## Rotas de metadados SEO

Next.js gera automaticamente estes arquivos a partir das funções default exportadas pelos módulos abaixo. Não são Route Handlers — não aparecem em `app/api/`.

| Arquivo | URL gerada | Descrição |
|---------|-----------|-----------|
| `app/robots.ts` | `/robots.txt` | Permite `/`; bloqueia `/api/`, `/dev/` e `/dashboard` para crawlers |
| `app/sitemap.ts` | `/sitemap.xml` | Sitemap com a landing page (`/`) — URL base definida por `NEXT_PUBLIC_SITE_URL` |

O fallback quando `NEXT_PUBLIC_SITE_URL` não está definido é `https://soujunior.tech`.
