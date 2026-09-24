import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@lib/supabase/server";
import { DashboardShell } from "@components/common/dashboard-shell";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login?next=/dashboard");
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  const fullName = user?.user_metadata?.full_name as string | undefined;
  const email = user?.email ?? "";
  const userName = fullName ?? email.split("@")[0] ?? "Apoiador";
  const userInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <DashboardShell
      user={{ name: userName, initials: userInitials }}
      defaultOpen={defaultOpen}
    >
      {children}
    </DashboardShell>
  );
}
