# Sistema de design e componentes

## Fonte primária

As regras do sistema Industry estão documentadas em [`DESIGN-SYSTEM.md`](../DESIGN-SYSTEM.md) na raiz do repositório. Este documento complementa com informações de implementação.

## Camadas de componentes

| Camada | Diretório | O que contém |
|--------|-----------|--------------|
| Primitivos | `components/ui/` | Componentes shadcn editáveis — aqui o tema vive |
| Compostos | `components/common/` | Composições reutilizáveis do produto |
| Feature | `components/<feature>/` | Componentes acoplados a uma feature específica |

**Regra de promoção:** um componente nasce dentro da feature (`app/**/_components/`). Após a terceira reutilização em features diferentes, sobe para `components/common/`. Não antecipe.

## Adicionar um novo componente shadcn

```bash
npx shadcn@latest add <componente>
```

Após instalar, ajuste o componente aos tokens do sistema Industry (cantos retos, cores de acento, etc.). A instalação cria o arquivo em `components/ui/`.

> Antes de criar qualquer componente do zero, siga a ordem definida em `CLAUDE.md`: verifique `components/ui/`, depois o catálogo shadcn, depois composição.

## Componentes UI disponíveis (`components/ui/`)

### Controles de formulário
`input`, `textarea`, `label`, `checkbox`, `radio-group`, `switch`, `select`, `native-select`, `input-group`, `field`, `input-otp`, `combobox`, `command`, `questionnaire`, `calendar`, `slider`

### Layout e contêineres
`card`, `blueprint`, `duotone`, `separator`, `alert`, `badge`, `aspect-ratio`, `resizable`

### Navegação e menus
`tabs`, `toggle-group`, `toggle`, `navigation-menu`, `breadcrumb`, `pagination`, `menubar`, `dropdown-menu`, `context-menu`, `sidebar`

### Elementos interativos
`button`, `button-group`, `dialog`, `sheet`, `popover`, `hover-card`, `alert-dialog`, `drawer`, `collapsible`, `accordion`

### Exibição de dados
`table`, `chart`, `carousel`, `scroll-area`

### Indicadores
`progress`, `skeleton`, `spinner`, `message`, `toast`

### Especialidades
`avatar`, `marker`, `bubble`, `attachment`, `kbd`, `empty`, `item`, `message-scroller`, `direction`

## Tokens CSS

Definidos em `app/globals.css`. Sempre use tokens — nunca valores hexadecimais soltos.

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#f2f2f3` | Fundo da página |
| `--color-surface` | `#e9e9ea` | Fundo de inputs e cards |
| `--color-text` | `#1d1f20` | Texto principal |
| `--color-accent` / `--primary` | `#5980a6` | Único acento permitido |
| `--color-divider` | 16% opacidade do texto | Bordas hairline |
| `--font-heading` | Barlow Condensed 600 | Títulos, botões |
| `--font-body` | Barlow 400 | Corpo de texto |
| `--radius-sm` | `2px` | Radius mínimo |
| `--radius-md` | `4px` | Radius médio |
| `--radius-lg` | `7px` | Radius máximo |

O padrão é `rounded-none` — cantos retos é a regra, não a exceção.

## Componentes especiais do sistema Industry

### `Blueprint`

Wrapper com borda hairline (1px) e marcas de registro (crosses 11×11px) nos quatro cantos a -6px. É a assinatura visual do sistema.

```tsx
import { Blueprint } from "@/components/ui/blueprint";

<Blueprint>
  <p>Conteúdo com moldura industrial</p>
</Blueprint>
```

### `Duotone`

Aplica blend mode com a cor de acento (steel blue) sobre uma imagem.

```tsx
import { Duotone } from "@/components/ui/duotone";

<Duotone src="/foto.jpg" alt="Descrição" />
```

## Preview dos componentes

Acesse `/dev/design-system` com o servidor em modo desenvolvimento para visualizar todos os componentes com suas variantes.

## Ícones

Sempre use **Lucide** com `strokeWidth={1.5}`:

```tsx
import { ArrowRight } from "lucide-react";

<ArrowRight strokeWidth={1.5} />
```

Não use outras bibliotecas de ícones. Não altere o `strokeWidth`.
