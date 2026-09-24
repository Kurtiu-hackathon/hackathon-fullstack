"use client"

import { useState } from "react"

import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"

export function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main
          id="main-content"
          className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
        />
      </div>
    </div>
  )
}
