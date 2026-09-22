import * as React from "react"
import { cn } from "cn"

export function Blueprint({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="blueprint"
      className={cn(
        "relative rounded-none border border-border bg-transparent",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 -translate-x-px -translate-y-px border-l-2 border-t-2 border-primary"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 translate-x-px -translate-y-px border-r-2 border-t-2 border-primary"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 -translate-x-px translate-y-px border-b-2 border-l-2 border-primary"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 translate-x-px translate-y-px border-b-2 border-r-2 border-primary"
      />
      {children}
    </div>
  )
}
