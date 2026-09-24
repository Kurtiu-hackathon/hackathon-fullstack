"use client"

import { useRef, useState } from "react"

import { useIsMobile } from "@hooks/use-mobile"
import { SECTION_TITLES, type SuperAdminSection } from "./super-admin-types"
import { SuperAdminAudit } from "./super-admin-audit"
import { SuperAdminEvents } from "./super-admin-events"
import { SuperAdminFinance } from "./super-admin-finance"
import { SuperAdminHeader } from "./super-admin-header"
import { SuperAdminOverview } from "./super-admin-overview"
import { SuperAdminPosts } from "./super-admin-posts"
import { SuperAdminSidebar } from "./super-admin-sidebar"
import { SuperAdminUsers } from "./super-admin-users"

type SuperAdminContentProps = {
  userName: string
  userInitials: string
}

export function SuperAdminContent({ userName, userInitials }: SuperAdminContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SuperAdminSection>("overview")
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()

  function navigate(section: SuperAdminSection) {
    setActiveSection(section)
    setSidebarOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {SECTION_TITLES[activeSection]}
      </div>

      <SuperAdminSidebar
        open={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={navigate}
        userName={userName}
        userInitials={userInitials}
      />

      <div className="lg:pl-64">
        <SuperAdminHeader
          menuButtonRef={menuButtonRef}
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
          activeSection={activeSection}
        />

        <main
          id="main-content"
          className="px-4 pb-16 pt-7 sm:px-6 lg:px-7"
        >
          {activeSection === "overview" && <SuperAdminOverview onNavigate={navigate} />}
          {activeSection === "users" && <SuperAdminUsers />}
          {activeSection === "posts" && <SuperAdminPosts />}
          {activeSection === "events" && <SuperAdminEvents />}
          {activeSection === "finance" && <SuperAdminFinance />}
          {activeSection === "audit" && <SuperAdminAudit />}
        </main>
      </div>
    </div>
  )
}
