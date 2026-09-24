import { redirect } from "next/navigation"

const VALID = new Set(["overview", "users", "posts", "events", "finance"])

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const raw = Array.isArray(params.section) ? params.section[0] : params.section
  const target = raw && VALID.has(raw) ? raw : "overview"

  const qs = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (key === "section") continue
    if (Array.isArray(val)) val.forEach((v) => qs.append(key, v))
    else if (val != null) qs.append(key, val as string)
  }

  redirect(`/admin/${target}${qs.size ? `?${qs}` : ""}`)
}
