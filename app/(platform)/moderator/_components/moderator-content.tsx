"use client"

import { useRef, useState } from "react"

import { useIsMobile } from "@hooks/use-mobile"
import { ModeratorEvents } from "./moderator-events"
import { ModeratorHeader } from "./moderator-header"
import { ModeratorOverview } from "./moderator-overview"
import { ModeratorPosts } from "./moderator-posts"
import { ModeratorSidebar } from "./moderator-sidebar"
import { SECTION_TITLES, type ModeratorSection } from "./moderator-types"

type ModeratorContentProps = {
  userName: string
  userInitials: string
}

export function ModeratorContent({ userName, userInitials }: ModeratorContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<ModeratorSection>("overview")
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()

  function navigate(section: ModeratorSection) {
    setActiveSection(section)
    setSidebarOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {SECTION_TITLES[activeSection]}
      </div>

      <ModeratorSidebar
        open={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={navigate}
        userName={userName}
        userInitials={userInitials}
      />

      <div className="lg:pl-64">
        <ModeratorHeader
          menuButtonRef={menuButtonRef}
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
          activeSection={activeSection}
        />

        <main
          id="main-content"
          className="px-4 pb-16 pt-7 sm:px-6 lg:px-7"
        >
          {activeSection === "overview" && <ModeratorOverview onNavigate={navigate} />}
          {activeSection === "posts" && <ModeratorPosts />}
          {activeSection === "events" && <ModeratorEvents />}
        </main>
      </div>
    </div>
  )
}
