import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "relative group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding font-heading font-semibold text-[14px] whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-45 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:stroke-[1.5]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary hover:bg-[var(--accent-600)] hover:border-[var(--accent-600)] active:bg-[var(--accent-700)] active:border-[var(--accent-700)]",
        outline:
          "border-border bg-transparent text-foreground hover:bg-[color-mix(in_srgb,var(--color-text)_7%,transparent)] active:bg-[color-mix(in_srgb,var(--color-text)_14%,transparent)]",
        secondary:
          "border-border bg-transparent text-foreground hover:bg-[color-mix(in_srgb,var(--color-text)_7%,transparent)] active:bg-[color-mix(in_srgb,var(--color-text)_14%,transparent)]",
        ghost:
          "text-primary hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] active:bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)]",
        destructive:
          "bg-[#8a3a3a]/10 text-[#8a3a3a] border-[#8a3a3a]/30 hover:bg-[#8a3a3a]/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-[12px] in-data-[slot=button-group]:rounded-none has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[13px] in-data-[slot=button-group]:rounded-none has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 in-data-[slot=button-group]:rounded-none [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 in-data-[slot=button-group]:rounded-none",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {(variant === "default" || variant === "outline") && (
        <>
          <i aria-hidden="true" className="blueprint-corner blueprint-corner--tl" />
          <i aria-hidden="true" className="blueprint-corner blueprint-corner--tr" />
          <i aria-hidden="true" className="blueprint-corner blueprint-corner--bl" />
          <i aria-hidden="true" className="blueprint-corner blueprint-corner--br" />
        </>
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
