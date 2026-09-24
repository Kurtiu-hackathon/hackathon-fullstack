"use client"

import { useRef, useState } from "react"

import { useIsMobile } from "@hooks/use-mobile"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { DashboardEvents } from "./dashboard-events"
import { DashboardAwards } from "./dashboard-awards"
import { DashboardForum } from "./dashboard-forum"
import { SECTION_TITLES, type ActiveSection } from "./dashboard-types"

export function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<ActiveSection>("overview")
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()

  function navigate(section: ActiveSection) {
    setActiveSection(section)
    setSidebarOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {SECTION_TITLES[activeSection]}
      </div>

      <DashboardSidebar
        open={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={navigate}
      />

      <div className="lg:pl-72">
        <DashboardHeader
          menuButtonRef={menuButtonRef}
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
          activeSection={activeSection}
        />

        <main
          id="main-content"
          className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8"
        >
          {activeSection === "overview" && <DashboardOverview />}
          {activeSection === "events" && <DashboardEvents />}
          {activeSection === "awards" && <DashboardAwards />}
          {activeSection === "forum" && <DashboardForum />}
        </main>
      </div>
    </div>
  )
}
