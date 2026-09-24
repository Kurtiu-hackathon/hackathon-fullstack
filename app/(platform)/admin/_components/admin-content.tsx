"use client"

import { useRef, useState } from "react"

import { useIsMobile } from "@hooks/use-mobile"
import { AdminEvents } from "./admin-events"
import { AdminFinance } from "./admin-finance"
import { AdminHeader } from "./admin-header"
import { AdminOverview } from "./admin-overview"
import { AdminPosts } from "./admin-posts"
import { AdminSidebar } from "./admin-sidebar"
import { AdminUsers } from "./admin-users"
import { SECTION_TITLES, type AdminSection } from "./admin-types"

type AdminContentProps = {
  userName: string
  userInitials: string
}

export function AdminContent({ userName, userInitials }: AdminContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<AdminSection>("overview")
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()

  function navigate(section: AdminSection) {
    setActiveSection(section)
    setSidebarOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {SECTION_TITLES[activeSection]}
      </div>

      <AdminSidebar
        open={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={navigate}
        userName={userName}
        userInitials={userInitials}
      />

      <div className="lg:pl-64">
        <AdminHeader
          menuButtonRef={menuButtonRef}
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
          activeSection={activeSection}
        />

        <main
          id="main-content"
          className="px-4 pb-16 pt-7 sm:px-6 lg:px-7"
        >
          {activeSection === "overview" && <AdminOverview onNavigate={navigate} />}
          {activeSection === "users" && <AdminUsers />}
          {activeSection === "posts" && <AdminPosts />}
          {activeSection === "events" && <AdminEvents />}
          {activeSection === "finance" && <AdminFinance />}
        </main>
      </div>
    </div>
  )
}
