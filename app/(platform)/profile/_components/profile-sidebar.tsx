"use client"

import { useRouter } from "next/navigation"

import { useIsMobile } from "@hooks/use-mobile"
import { DashboardSidebar } from "../../dashboard/_components/dashboard-sidebar"
import { AdminSidebar } from "../../admin/_components/admin-sidebar"
import { ModeratorSidebar } from "../../moderator/_components/moderator-sidebar"
import { SuperAdminSidebar } from "../../super-admin/_components/super-admin-sidebar"
import { usePlatformSidebar } from "./platform-sidebar-context"

type ProfileSidebarProps = {
  role: string | undefined
  userName: string
  userInitials: string
}

export function ProfileSidebar({ role, userName, userInitials }: ProfileSidebarProps) {
  const { open, close } = usePlatformSidebar()
  const isMobile = useIsMobile()
  const router = useRouter()

  const backHref =
    role === "ADMIN"
      ? "/admin"
      : role === "MODERATOR"
        ? "/moderator"
        : role === "SUPER_ADMIN"
          ? "/super-admin"
          : "/dashboard"

  function handleNavigate(section: string) {
    router.push(`${backHref}?section=${section}`)
  }

  const commonProps = { open, isMobile, onClose: close, onNavigate: handleNavigate }

  if (role === "ADMIN") {
    return (
      <AdminSidebar
        {...commonProps}
        userName={userName}
        userInitials={userInitials}
      />
    )
  }

  if (role === "MODERATOR") {
    return (
      <ModeratorSidebar
        {...commonProps}
        userName={userName}
        userInitials={userInitials}
      />
    )
  }

  if (role === "SUPER_ADMIN") {
    return (
      <SuperAdminSidebar
        {...commonProps}
        userName={userName}
        userInitials={userInitials}
      />
    )
  }

  return <DashboardSidebar {...commonProps} />
}
