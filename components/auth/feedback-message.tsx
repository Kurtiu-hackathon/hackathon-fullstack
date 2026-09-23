import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const feedbackMessageVariants = cva("border-l-2 px-4 py-3 text-sm", {
  variants: {
    variant: {
      error: "border-destructive bg-destructive/5 text-destructive",
      success: "border-primary bg-primary/10 text-foreground",
    },
  },
  defaultVariants: {
    variant: "error",
  },
});

type FeedbackMessageProps = React.ComponentProps<"p"> &
  VariantProps<typeof feedbackMessageVariants>;

export function FeedbackMessage({
  children,
  className,
  variant,
  ...props
}: FeedbackMessageProps) {
  return (
    <p
      className={cn(feedbackMessageVariants({ variant }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
