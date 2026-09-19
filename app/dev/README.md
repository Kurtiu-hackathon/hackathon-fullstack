# Rota `/dev` — Ambiente de Desenvolvimento

Páginas sob `app/dev/` são protegidas por `layout.tsx` e **só funcionam em `NODE_ENV=development`**. Em produção, qualquer acesso retorna 404 automaticamente.

## Propósito

Use `/dev` para páginas de verificação, inspeção e debugging que não devem existir no ar em produção:

- Validação visual de componentes e tokens (design system)
- Inspecionar dados mockados / seeds
- Smoke-tests manuais de features em WIP
- Qualquer ferramenta interna que não deve ser exposta ao usuário final

## Convenção de nomenclatura

| Finalidade | Rota sugerida |
|---|---|
| Design system / componentes | `/dev/design-system` |
| Validação de feature X | `/dev/verify-<feature>` |
| Inspeção de dados | `/dev/data-<entidade>` |
| Playground de componente | `/dev/play-<componente>` |

## Como adicionar uma nova página

1. Crie `app/dev/<nome>/page.tsx` — o layout pai já aplica o guard.
2. Não importe o layout em outras rotas; ele é automático via Next.js.
3. Não adicione links para rotas `/dev` em navegação de produção.

## Acesso

```
# Só funciona localmente
npm run dev
# → http://localhost:3000/dev/design-system
```

Em qualquer ambiente com `NODE_ENV != "development"` (preview, staging, produção) a rota retorna **404**.
