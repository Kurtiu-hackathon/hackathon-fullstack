"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.ComponentProps<typeof Input>;

export function PasswordInput({
  className,
  disabled,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="group/input relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        disabled={disabled}
        className={cn("h-16 rounded-none pr-24", className)}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute inset-y-0 right-0 min-h-11 px-4 font-mono text-[0.68rem] tracking-[0.16em] text-[var(--accent-700)] uppercase hover:bg-muted/50 hover:text-[var(--accent-800)]"
        onClick={() => setIsVisible((current) => !current)}
        disabled={disabled}
        aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={isVisible}
      >
        {isVisible ? "Ocultar" : "Mostrar"}
      </Button>
    </div>
  );
}
