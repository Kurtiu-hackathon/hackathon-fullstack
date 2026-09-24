import { redirect } from "next/navigation"

const VALID = new Set(["overview", "posts", "events"])

type ModeratorPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ModeratorPage({ searchParams }: ModeratorPageProps) {
  const params = await searchParams
  const raw = Array.isArray(params.section) ? params.section[0] : params.section
  const target = raw && VALID.has(raw) ? raw : "overview"

  const qs = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (key === "section") continue
    if (Array.isArray(val)) val.forEach((v) => qs.append(key, v))
    else if (val != null) qs.append(key, val as string)
  }

  redirect(`/moderator/${target}${qs.size ? `?${qs}` : ""}`)
}
