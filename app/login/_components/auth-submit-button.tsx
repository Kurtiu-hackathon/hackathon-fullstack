import { ArrowRight, LoaderCircle } from "lucide-react";

import { authSubmitClassName } from "@/app/login/_components/auth-form-styles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuthSubmitButtonProps = React.ComponentProps<typeof Button> & {
  isSubmitting: boolean;
  pendingLabel: string;
};

export function AuthSubmitButton({
  children,
  className,
  disabled,
  isSubmitting,
  pendingLabel,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <Button
      className={cn(authSubmitClassName, className)}
      disabled={disabled || isSubmitting}
      {...props}
    >
      {isSubmitting ? (
        <>
          <LoaderCircle
            aria-hidden="true"
            data-icon="inline-start"
            className="animate-spin"
            strokeWidth={1.5}
          />
          {pendingLabel}
        </>
      ) : (
        <>
          {children}
          <ArrowRight
            aria-hidden="true"
            data-icon="inline-end"
            className="transition-transform duration-200 motion-safe:group-hover/button:translate-x-0.5 motion-reduce:transition-none"
            strokeWidth={1.5}
          />
        </>
      )}
    </Button>
  );
}
