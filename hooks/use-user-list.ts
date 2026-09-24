"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { listUsers, type AdminUser, type UserStatus } from "@lib/actions/admin"

export function useUserList() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [filter, setFilter] = useState<UserStatus | "todos">("todos")
  const [users, setUsers] = useState<AdminUser[]>([])
  const [page, setPage] = useState(0)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [revision, setRevision] = useState(0)
  const generation = useRef(0)
  const pending = useRef(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const filtering = debouncedQuery.trim() !== "" || filter !== "todos"

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400)
    return () => clearTimeout(timer)
  }, [query])

  const fetchPage = useCallback(async (next: number, version: number) => {
    pending.current = true
    setLoading(true)
    setError(null)
    try {
      const result = await listUsers({ page: next, perPage: filtering ? 500 : 20, search: debouncedQuery, status: filter })
      if (version !== generation.current) return
      if (result.status === "error") throw new Error(result.message)
      if (!result.data) throw new Error("Resposta inválida ao carregar usuários.")
      const data = result.data
      setUsers((previous) => next === 1 ? data.users : [...previous, ...data.users])
      setPage(next)
      setLastPage(filtering ? 1 : data.lastPage)
      setTotal(data.total)
    } catch (cause) {
      if (version === generation.current) setError(cause instanceof Error ? cause.message : "Não foi possível carregar os usuários.")
    } finally {
      if (version === generation.current) {
        pending.current = false
        setLoading(false)
        setInitialLoading(false)
      }
    }
  }, [debouncedQuery, filter, filtering])

  useEffect(() => {
    const version = ++generation.current
    pending.current = true
    void Promise.resolve().then(() => {
      if (version !== generation.current) return
      setUsers([])
      setPage(0)
      setLastPage(1)
      setInitialLoading(true)
      void fetchPage(1, version)
    })
    return () => { generation.current = version + 1 }
  }, [fetchPage, revision])

  const loadMore = useCallback(() => {
    if (pending.current || (page > 0 && (filtering || page >= lastPage))) return
    void fetchPage(page + 1, generation.current)
  }, [page, lastPage, filtering, fetchPage])

  const hasMore = !initialLoading && !error && !filtering && page < lastPage
  useEffect(() => {
    const element = sentinelRef.current
    if (!element || !hasMore) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) loadMore()
    }, { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [loadMore, hasMore, loading])

  const refresh = useCallback(() => {
    generation.current++
    setRevision((value) => value + 1)
  }, [])
  const reset = useCallback(() => { setQuery(""); setFilter("todos") }, [])
  return { query, setQuery, filter, setFilter, users, total, loading, initialLoading, hasMore, sentinelRef, reset, refresh, error, retry: loadMore }
}
