"use client"

import { useState } from "react"
import { Download, Search } from "lucide-react"

import { Blueprint } from "@components/ui/blueprint"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import { ACTION_LABELS, AUDIT_ENTRIES, type AuditAction } from "@lib/mock/admin/audit"

const ALL_ACTIONS: AuditAction[] = [
  "login", "logout", "role_change", "ban", "delete", "export", "approve", "reject",
]

export function SuperAdminAudit() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<AuditAction | "todos">("todos")

  const filtered = AUDIT_ENTRIES.filter((e) => {
    const matchesQuery =
      e.actor.toLowerCase().includes(query.toLowerCase()) ||
      e.description.toLowerCase().includes(query.toLowerCase()) ||
      e.target.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === "todos" || e.action === filter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="max-w-lg text-[13.5px] leading-relaxed text-muted-foreground">
            Registro completo de todas as ações realizadas no console. Somente Super admin tem acesso a esta área.
          </p>
          <p className="mt-1 inline-block bg-[var(--accent-100)] px-2 py-1 text-[12.5px] text-[var(--accent-800)]">
            Área restrita — log imutável
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 font-heading uppercase tracking-[0.04em]"
        >
          <Download size={14} strokeWidth={1.5} aria-hidden="true" />
          Exportar CSV · {filtered.length}
        </Button>
      </div>

      <Blueprint>
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border p-3">
          <div className="relative min-w-[200px] flex-1 max-w-xs">
            <Search
              size={15}
              strokeWidth={1.5}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no log…"
              className="pl-8"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button
              variant={filter === "todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("todos")}
              className="font-heading text-[11px] uppercase tracking-[0.06em]"
            >
              Todos <span className="opacity-60">{AUDIT_ENTRIES.length}</span>
            </Button>
            {ALL_ACTIONS.filter((a) =>
              AUDIT_ENTRIES.some((e) => e.action === a)
            ).map((a) => {
              const count = AUDIT_ENTRIES.filter((e) => e.action === a).length
              return (
                <Button
                  key={a}
                  variant={filter === a ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(a)}
                  className="font-heading text-[11px] uppercase tracking-[0.06em]"
                >
                  {ACTION_LABELS[a]} <span className="opacity-60">{count}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ator</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Quando</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-9 text-center text-[13.5px] text-muted-foreground">
                  Nada encontrado para &ldquo;{query}&rdquo;.{" "}
                  <button
                    type="button"
                    onClick={() => { setQuery(""); setFilter("todos") }}
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Limpar filtros
                  </button>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.actor}</TableCell>
                  <TableCell>
                    <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      {entry.actorRole}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center border border-border px-2 py-0.5 text-[11px] font-medium text-foreground">
                      {ACTION_LABELS[entry.action]}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[280px]">
                    <p className="truncate text-muted-foreground">{entry.description}</p>
                  </TableCell>
                  <TableCell className="font-mono text-[12px] text-muted-foreground">
                    {entry.ip}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{entry.when}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Blueprint>
    </div>
  )
}
