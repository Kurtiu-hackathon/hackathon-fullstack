# Banco de dados e persistência

## Supabase local

O banco de dados em desenvolvimento é um PostgreSQL 17 gerenciado pelo Supabase CLI via Docker.

| Parâmetro | Valor |
|-----------|-------|
| Host | `127.0.0.1` |
| Porta | `54322` |
| Banco | `postgres` |
| Usuário | `postgres` |
| Senha | `postgres` |
| URL completa | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |

Acesse via Supabase Studio em `http://127.0.0.1:54323` para inspecionar tabelas, executar queries e gerenciar dados.

## Configurações relevantes do `supabase/config.toml`

### Autenticação

| Configuração | Valor | Descrição |
|-------------|-------|-----------|
| JWT expiry | 3600s (1h) | Tempo de vida do token de acesso |
| Refresh token rotation | habilitado | Cada uso gera novo refresh token |
| Sign-ups | habilitados | Qualquer pessoa pode se cadastrar |
| Anonymous sign-ins | desabilitados | Não há sessões anônimas |
| Email confirmations | obrigatórias | Cadastro requer confirmação por e-mail |
| Senha mínima | 6 caracteres (config) / 8 caracteres (validação Zod) | O Zod é mais restritivo |
| OTP length | 6 caracteres | Tokens de e-mail |
| OTP expiry | 3600s (1h) | Validade do link de confirmação |

> A validação no cliente (`lib/validations/auth.ts`) exige senha de no mínimo 8 caracteres, mais restritivo que o limite de 6 configurado no Supabase.

### Storage

| Configuração | Valor |
|-------------|-------|
| Tamanho máximo de arquivo | 50 MiB |
| Protocolo S3 | habilitado |

### Serviços

| Serviço | Estado |
|---------|--------|
| Realtime | habilitado |
| Analytics | habilitado (backend Postgres) |
| Edge Functions | habilitado (Deno v2, per-worker) |

## Templates de e-mail

Os templates de e-mail transacional estão em `supabase/templates/`:

| Arquivo | Evento |
|---------|--------|
| `confirmation.html` | Confirmação de cadastro |
| `recovery.html` | Recuperação de senha |

Ambos estão em português (pt-BR).

## Migrações

**Não verificado:** nenhuma migration foi encontrada no repositório. O esquema de dados não está versionado via código.

Para criar uma nova migration:

```bash
npx supabase migration new <nome-descritivo>
```

O arquivo será criado em `supabase/migrations/`. Após editar o SQL:

```bash
npx supabase db push
```

## Edge Functions

O diretório `supabase/snippets/` está presente mas vazio. Nenhuma Edge Function está implementada atualmente.

Para criar uma nova Edge Function:

```bash
npx supabase functions new <nome>
```
