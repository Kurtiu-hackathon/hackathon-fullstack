"use client"

import { useState } from "react"
import { Download, Search } from "lucide-react"

import { Badge } from "@components/ui/badge"
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
import { PERMISSION_MATRIX, STATUS_USER_COLORS, USERS, type UserStatus } from "@lib/mock/admin/users"

const ALL_STATUSES: UserStatus[] = ["ativo", "suspenso", "banido", "pendente"]

export function AdminUsers() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<UserStatus | "todos">("todos")

  const filtered = USERS.filter((u) => {
    const matchesQuery =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === "todos" || u.status === filter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-lg text-[13.5px] leading-relaxed text-muted-foreground">
          Gerencie todos os usuários da plataforma. Alterações de papel são restritas ao Super admin.
        </p>
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
              placeholder="Buscar usuários…"
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
              Todos{" "}
              <span className="opacity-60">{USERS.length}</span>
            </Button>
            {ALL_STATUSES.map((s) => {
              const count = USERS.filter((u) => u.status === s).length
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
              <TableHead>E-mail</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cadastro</TableHead>
              <TableHead>Último acesso</TableHead>
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
              filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-heading text-[10px] uppercase tracking-[0.08em]">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-medium ${STATUS_USER_COLORS[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]">
                        Ver
                      </Button>
                      {user.status !== "banido" && (
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10">
                          Banir
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Blueprint>

      <Blueprint className="p-[18px]">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2.5">
          <h2 className="font-heading text-[16px] font-bold">Matriz de permissões</h2>
          <p className="text-[12px] text-muted-foreground">Alterável apenas por Super admin</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="border-b border-border pb-2 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Permissão
                </th>
                <th className="border-b border-border pb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Super admin
                </th>
                <th className="border-b border-border pb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Admin
                </th>
                <th className="border-b border-border pb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Moderador
                </th>
              </tr>
            </thead>
            <tbody>
              {PERMISSION_MATRIX.map((row) => (
                <tr key={row.label}>
                  <td className="border-b border-border py-2">{row.label}</td>
                  <td className="border-b border-border py-2 text-center text-primary">
                    {row.superAdmin ? "✓" : "—"}
                  </td>
                  <td className="border-b border-border py-2 text-center text-primary">
                    {row.admin ? "✓" : "—"}
                  </td>
                  <td className="border-b border-border py-2 text-center text-primary">
                    {row.moderator ? "✓" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Blueprint>
    </div>
  )
}
