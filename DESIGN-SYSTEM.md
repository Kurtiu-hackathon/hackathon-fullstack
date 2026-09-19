# Industry Design System

Regras obrigatórias para manter a coerência visual do projeto.

## As 5 regras não-negociáveis

1. **Cantos retos.** `rounded-none` em tudo: card, button, input, badge, dialog, tabs, select, popover, table. Raio só existe via token (`--radius-sm: 2px`, `--radius-md: 4px`, `--radius-lg: 7px`) para casos raros e documentados.

2. **Cards são desenhos de linha.** Fundo sempre `transparent` + borda hairline 1px (`border border-border`). Nunca `bg-card` sólido, nunca `shadow-*` em card por padrão. Use `Blueprint` para as marcas de registro.

3. **Marcas de registro "+".** O componente `Blueprint` (ou as marcas embutidas em `Card` e no botão `default`) imprime quatro cruzes de 11 × 11 px a −6 px de cada canto. É a assinatura visual do sistema.

4. **Um único acento.** Azul-aço `#5980a6` (`--color-accent`, `--primary`). Sem segunda cor decorativa, sem gradientes. Para hover/active use os degraus da rampa: `--accent-600`, `--accent-700`. Para texto em fundo acentuado, `--color-bg`.

5. **Ícones Lucide, `strokeWidth={1.5}` sempre.** Nunca mais grosso. Nunca ícones de outra biblioteca.

## Tokens principais

| Token CSS             | Valor           | Uso                        |
|-----------------------|-----------------|----------------------------|
| `--color-bg`          | `#f2f2f3`       | Fundo da página            |
| `--color-surface`     | `#e9e9ea`       | Fundo de inputs e cards    |
| `--color-text`        | `#1d1f20`       | Texto principal            |
| `--color-accent`      | `#5980a6`       | Acento único               |
| `--color-divider`     | `16% text`      | Bordas hairline            |
| `--font-heading`      | Barlow Condensed 600 | Headings e botões     |
| `--font-body`         | Barlow 400      | Corpo de texto             |

## Componentes novos do sistema

- **`Blueprint`** (`components/ui/blueprint.tsx`) — wrapper com borda hairline + marcas "+". Use em figuras, destaque e qualquer container emoldurado.
- **`Duotone`** (`components/ui/duotone.tsx`) — wrapper que aplica blend `color` do acento sobre imagens (efeito duotone aço).

## Contraste

O par acento/fundo tem ~3:1. Use `--accent-700` ou mais escuro para texto corrido em cor de acento. Nunca texto de acento sobre foto com opacidade reduzida.

## Showcase visual

Rota `/design-system` — todos os componentes lado a lado para validação rápida.
