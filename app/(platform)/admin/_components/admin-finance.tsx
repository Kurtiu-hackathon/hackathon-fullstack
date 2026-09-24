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
import { DONATIONS, STATUS_DONATION_COLORS, type DonationStatus } from "@lib/mock/admin/finance"

const ALL_STATUSES: DonationStatus[] = ["aprovado", "pendente", "estornado", "falhou"]

export function AdminFinance() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<DonationStatus | "todos">("todos")

  const filtered = DONATIONS.filter((d) => {
    const matchesQuery =
      d.donor.toLowerCase().includes(query.toLowerCase()) ||
      d.email.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === "todos" || d.status === filter
    return matchesQuery && matchesFilter
  })

  const total = DONATIONS.filter((d) => d.status === "aprovado")
    .reduce((sum, d) => {
      const val = parseFloat(d.amount.replace("R$ ", "").replace(",", "."))
      return sum + val
    }, 0)
    .toFixed(2)
    .replace(".", ",")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="max-w-lg text-[13.5px] leading-relaxed text-muted-foreground">
            Histórico de doações e repasses da plataforma.
          </p>
          <p className="mt-1 inline-block bg-[var(--accent-100)] px-2 py-1 text-[12.5px] text-[var(--accent-800)]">
            Total aprovado neste período: <strong>R$ {total}</strong>
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
              placeholder="Buscar doações…"
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
              Todos <span className="opacity-60">{DONATIONS.length}</span>
            </Button>
            {ALL_STATUSES.map((s) => {
              const count = DONATIONS.filter((d) => d.status === s).length
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
              <TableHead>Doador</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
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
              filtered.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.donor}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.email}</TableCell>
                  <TableCell className="font-heading font-semibold">{donation.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.tier}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.method}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-medium ${STATUS_DONATION_COLORS[donation.status]}`}
                    >
                      {donation.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{donation.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Blueprint>
    </div>
  )
}
