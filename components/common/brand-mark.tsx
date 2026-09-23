import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const brandSquareVariants = cva("absolute size-2.5", {
  variants: {
    tone: {
      default: "bg-primary",
      inverse: "bg-background",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

type BrandMarkProps = React.ComponentProps<"span"> &
  VariantProps<typeof brandSquareVariants>;

export function BrandMark({
  className,
  tone,
  ...props
}: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative block size-6 shrink-0", className)}
      {...props}
    >
      <span className={brandSquareVariants({ tone, className: "top-0 left-1" })} />
      <span className={brandSquareVariants({ tone, className: "top-2.5 left-0" })} />
      <span
        className={brandSquareVariants({
          tone,
          className: "top-2.5 left-2.5",
        })}
      />
    </span>
  );
}
