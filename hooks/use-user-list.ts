import { useCallback, useEffect, useRef, useState } from "react"

import { listUsers, type AdminUser, type UserStatus } from "@lib/actions/admin"

const PER_PAGE = 20
const SEARCH_PER_PAGE = 500

export function useUserList() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [filter, setFilter] = useState<UserStatus | "todos">("todos")
  const [users, setUsers] = useState<AdminUser[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    const filtering = debouncedQuery.trim() !== "" || filter !== "todos"
    let cancelled = false

    setUsers([])
    setPage(1)
    setInitialLoading(true)
    setLoading(true)

    listUsers({
      page: 1,
      perPage: filtering ? SEARCH_PER_PAGE : PER_PAGE,
      search: debouncedQuery,
      status: filter,
    }).then((result) => {
      if (cancelled) return
      if (result.status === "success" && result.data) {
        setUsers(result.data.users)
        setLastPage(filtering ? 1 : result.data.lastPage)
        setTotal(result.data.total)
      }
      setLoading(false)
      setInitialLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, filter])

  const loadMore = useCallback(() => {
    const filtering = debouncedQuery.trim() !== "" || filter !== "todos"
    if (loading || page >= lastPage || filtering) return

    const next = page + 1
    setPage(next)
    setLoading(true)

    listUsers({ page: next, perPage: PER_PAGE, search: "", status: "todos" }).then((result) => {
      if (result.status === "success" && result.data) {
        setUsers((prev) => [...prev, ...result.data!.users])
      }
      setLoading(false)
    })
  }, [loading, page, lastPage, debouncedQuery, filter])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  const reset = useCallback(() => {
    setQuery("")
    setFilter("todos")
  }, [])

  const hasMore = debouncedQuery.trim() === "" && filter === "todos" && page < lastPage

  return {
    query,
    setQuery,
    filter,
    setFilter,
    users,
    total,
    loading,
    initialLoading,
    hasMore,
    sentinelRef,
    reset,
  }
}
