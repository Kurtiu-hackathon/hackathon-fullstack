import * as React from "react"
import { cn } from "cn"

function Duotone({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
      {/* Duotone overlay: desaturates image and blends accent color */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "var(--color-accent)",
          mixBlendMode: "color",
        }}
      />
    </div>
  )
}

export { Duotone }
