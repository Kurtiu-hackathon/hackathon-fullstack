# SouJunior

Plataforma de mentoria e aceleração de carreira para desenvolvedores juniores brasileiros. Mantida pela própria comunidade — projetos open-source reais, mentoria gratuita e a primeira oportunidade de milhares de devs juniores, começando com R$ 2/mês.

## Status do projeto

| Área | Estado |
|------|--------|
| Landing page | Implementada |
| Autenticação (e-mail + Google OAuth) | Implementada |
| Dashboard | Em desenvolvimento |
| Migrações de banco de dados | Não iniciadas |
| CI/CD | Não configurado |

## Stack

Next.js 16 · React 19 · TypeScript 5 · Tailwind v4 · shadcn/ui (base-nova) · Supabase (Auth + PostgreSQL 17) · Three.js

## Início rápido

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar Supabase local (requer Docker Desktop em execução)
npx supabase start

# 3. Copiar e preencher variáveis de ambiente
cp .env.example .env.local
# edite .env.local com os valores impressos pelo supabase start

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`. Veja [`docs/setup.md`](docs/setup.md) para instruções detalhadas.

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [`docs/architecture.md`](docs/architecture.md) | Diagrama do sistema, App Router, decisões técnicas |
| [`docs/setup.md`](docs/setup.md) | Pré-requisitos, variáveis de ambiente, comandos |
| [`docs/auth.md`](docs/auth.md) | Fluxos de autenticação, proteção de rotas, OAuth |
| [`docs/routes.md`](docs/routes.md) | Inventário de rotas, APIs, páginas de erro |
| [`docs/design-system.md`](docs/design-system.md) | Componentes, tokens CSS, regras de estilo |
| [`docs/database.md`](docs/database.md) | Supabase local, configurações, migrações |
| [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) | Regras do sistema Industry (fonte primária de estilo) |

## Convenções importantes

**`proxy.ts` em vez de `middleware.ts`**
Next.js 16 renomeou o arquivo de interceptação de requests. A função exportada chama-se `proxy`. Ver [`docs/architecture.md`](docs/architecture.md).

**shadcn base-nova**
Usa `@base-ui/react` em vez de Radix UI. A API dos componentes difere (prop `render`, atributos `data-*`). Ver [`docs/design-system.md`](docs/design-system.md).

**Sistema Industry**
Design minimalista com cantos retos (`rounded-none`), cards como desenhos de linha, único acento em steel blue. Ícones Lucide com `strokeWidth={1.5}` sempre. Ver [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).

**Idioma**
Toda a interface, mensagens de erro e e-mails estão em português (pt-BR).

## Desenvolvimento

```bash
npm run dev      # servidor com hot reload
npm run build    # build de produção
npm run lint     # ESLint
```

Preview dos componentes UI: `http://localhost:3000/dev/design-system` (apenas em desenvolvimento).
