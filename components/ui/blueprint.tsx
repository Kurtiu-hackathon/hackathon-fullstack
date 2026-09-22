import * as React from "react"
import { cn } from "cn"

type CornerPos = "tl" | "tr" | "bl" | "br"

function Corner({ pos }: { pos: CornerPos }) {
  return (
    <i
      aria-hidden="true"
      className={`blueprint-corner blueprint-corner--${pos}`}
    />
  )
}

function Blueprint({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative rounded-none border border-border",
        className
      )}
      {...props}
    >
      {children}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
    </div>
  )
}

export { Blueprint }
