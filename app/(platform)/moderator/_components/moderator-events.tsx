"use client"

import { useState } from "react"
import { Search } from "lucide-react"

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
import { EVENTS, STATUS_EVENT_COLORS, type EventStatus } from "@lib/mock/admin/events"

const ALL_STATUSES: EventStatus[] = ["aprovado", "pendente", "cancelado", "encerrado"]

export function ModeratorEvents() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<EventStatus | "todos">("todos")

  const filtered = EVENTS.filter((e) => {
    const matchesQuery =
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.organizer.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === "todos" || e.status === filter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-lg text-[13.5px] leading-relaxed text-muted-foreground">
          Aprove eventos pendentes ou sinalize problemas para o Admin.
        </p>
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
              placeholder="Buscar eventos…"
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
              Todos <span className="opacity-60">{EVENTS.length}</span>
            </Button>
            {ALL_STATUSES.map((s) => {
              const count = EVENTS.filter((e) => e.status === s).length
              return (
                <Button
                  key={s}
                  variant={filter === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(s)}
                  className="font-heading text-[11px] uppercase tracking-[0.06em]"
                >
                  {s} <span className="opacity-60">{count}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Organizador</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Inscritos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-9 text-center text-[13.5px] text-muted-foreground">
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
              filtered.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="max-w-[200px]">
                    <p className="truncate font-medium">{event.name}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{event.organizer}</TableCell>
                  <TableCell className="text-muted-foreground">{event.date}</TableCell>
                  <TableCell className="text-muted-foreground">{event.location}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-medium ${STATUS_EVENT_COLORS[event.status]}`}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {event.attendees > 0 ? event.attendees : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      {event.status === "pendente" && (
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px]">
                          Aprovar
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]">
                        Ver
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Blueprint>
    </div>
  )
}
