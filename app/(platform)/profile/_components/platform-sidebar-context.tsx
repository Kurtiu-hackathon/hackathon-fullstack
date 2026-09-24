"use client"

import { createContext, useContext, useState } from "react"

type PlatformSidebarContextValue = {
  open: boolean
  toggle: () => void
  close: () => void
}

const PlatformSidebarContext = createContext<PlatformSidebarContextValue>({
  open: false,
  toggle: () => {},
  close: () => {},
})

type PlatformSidebarProviderProps = {
  children: React.ReactNode
}

export function PlatformSidebarProvider({ children }: PlatformSidebarProviderProps) {
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen((prev) => !prev)
  }

  function close() {
    setOpen(false)
  }

  return (
    <PlatformSidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </PlatformSidebarContext.Provider>
  )
}

export function usePlatformSidebar() {
  return useContext(PlatformSidebarContext)
}
