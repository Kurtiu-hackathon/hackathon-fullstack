# Ambiente local

## Pré-requisitos

| Ferramenta | Versão mínima | Verificar |
|------------|---------------|-----------|
| Node.js | 22 | `node -v` |
| npm | 10 | `npm -v` |
| Supabase CLI | 2.117 | `npx supabase -v` |
| Docker Desktop | qualquer recente | necessário para `supabase start` |

> O Supabase CLI gerencia containers Docker localmente. O Docker Desktop precisa estar em execução antes de `supabase start`.

## Instalação

```bash
git clone <url-do-repositorio>
cd hackathon-fullstack
npm install
```

## Variáveis de ambiente

### Obrigatórias em produção (`.env.example`)

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

| Variável | Finalidade | Exemplo (seguro) |
|----------|------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL da instância Supabase | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave pública (anon key) do Supabase | `sb_publishable_...` |
| `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID` | Client ID do OAuth Google | `xxxxx.apps.googleusercontent.com` |
| `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET` | Client Secret do OAuth Google | `GOCSPX-...` |

### Geradas automaticamente pelo `supabase start` (apenas dev)

Após rodar `npx supabase start`, o CLI imprime todos os valores abaixo. Cole-os no `.env.local`:

| Variável | Finalidade |
|----------|------------|
| `DATABASE_URL` | Conexão direta ao PostgreSQL local |
| `NEXT_PUBLIC_SUPABASE_URL` | URL da API local (ex.: `http://127.0.0.1:54321`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave anon local |
| `SUPABASE_SECRET_KEY` | Chave de serviço (acesso irrestrito ao DB) |
| `NEXT_PUBLIC_SUPABASE_REST_URL` | Endpoint REST do PostgREST |
| `NEXT_PUBLIC_SUPABASE_GRAPHQL_URL` | Endpoint GraphQL |
| `NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL` | Endpoint para Edge Functions |
| `NEXT_PUBLIC_SUPABASE_STORAGE_URL` | Endpoint de Storage (S3-compatible) |
| `SUPABASE_S3_ACCESS_KEY` | Access key S3 local |
| `SUPABASE_S3_SECRET_KEY` | Secret key S3 local |
| `SUPABASE_S3_REGION` | Região S3 local (sempre `local`) |
| `SUPABASE_STUDIO_URL` | URL do Supabase Studio |
| `SUPABASE_MAILPIT_URL` | URL do Mailpit (e-mails de dev) |
| `SUPABASE_MCP_URL` | URL do MCP server do Supabase |

> `SUPABASE_SECRET_KEY` não deve ser exposta no browser. Nunca prefixe com `NEXT_PUBLIC_`.

## Inicialização

### 1. Iniciar Supabase local

```bash
npx supabase start
```

Aguarde o Docker inicializar todos os serviços. Na primeira execução, o download das imagens pode levar alguns minutos.

### 2. Iniciar o servidor Next.js

```bash
npm run dev
```

## URLs úteis (ambiente local)

| Serviço | URL | Finalidade |
|---------|-----|------------|
| Aplicação | `http://localhost:3000` | Frontend Next.js |
| Supabase API | `http://127.0.0.1:54321` | REST/GraphQL/Auth |
| Supabase Studio | `http://127.0.0.1:54323` | UI de administração do banco |
| Mailpit | `http://127.0.0.1:54324` | Intercepta e-mails enviados em dev |
| PostgreSQL | `127.0.0.1:54322` | Acesso direto ao banco |

> Use o Mailpit para visualizar e-mails de confirmação e recuperação de senha durante o desenvolvimento.

## Comandos disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção otimizado |
| `npm run start` | Inicia o servidor em modo produção (requer build anterior) |
| `npm run lint` | Executa ESLint em todo o projeto |

## Parar o Supabase local

```bash
npx supabase stop
```

Para destruir os dados locais junto:

```bash
npx supabase stop --no-backup
```
