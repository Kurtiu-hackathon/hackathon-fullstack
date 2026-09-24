"use client"

import { Download, Loader2, Search } from "lucide-react"

import { UserActions } from "@components/user-manager/user-actions"
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
import { PERMISSION_MATRIX, STATUS_USER_COLORS } from "@lib/mock/admin/users"
import { useUserList } from "@hooks/use-user-list"
import type { UserStatus } from "@lib/actions/admin"

const ALL_STATUSES: UserStatus[] = ["ativo", "suspenso", "banido", "pendente"]

const ROLE_LABELS: Record<string, string> = {
  USER: "Usuário",
  MODERATOR: "Moderador",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
}

function formatDate(iso: string | undefined | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export function AdminUsers() {
  const {
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
    refresh,
    error,
    retry,
  } = useUserList()

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
          Exportar CSV · {users.length}
        </Button>
      </div>

      {error && <div role="alert" className="flex items-center gap-3 text-sm text-destructive">{error}<Button variant="outline" onClick={retry} disabled={loading}>Tentar novamente</Button></div>}

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
              Todos <span className="opacity-60">{total}</span>
            </Button>
            {ALL_STATUSES.map((s) => (
              <Button
                key={s}
                variant={filter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(s)}
                className="font-heading text-[11px] uppercase tracking-[0.06em]"
              >
                {s}
              </Button>
            ))}
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
            {initialLoading ? (
              Array.from({ length: 5 }, (_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }, (_, j) => (
                    <TableCell key={j}>
                      <div
                        className="h-3.5 animate-pulse rounded-sm bg-muted"
                        style={{ width: `${45 + ((i * 7 + j) * 17) % 40}%` }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-9 text-center text-[13.5px] text-muted-foreground">
                  Nada encontrado para &ldquo;{query}&rdquo;.{" "}
                  <button
                    type="button"
                    onClick={reset}
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Limpar filtros
                  </button>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-heading text-[10px] uppercase tracking-[0.08em]">
                        {ROLE_LABELS[user.role] ?? user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-medium ${STATUS_USER_COLORS[user.status]}`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(user.joinedAt)}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(user.lastLogin)}</TableCell>
                    <TableCell className="text-right">
                      <UserActions user={user} onChanged={refresh} />
                    </TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-3 text-center">
                      <Loader2 size={16} strokeWidth={1.5} className="mx-auto animate-spin text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>

        {hasMore && (
          <div ref={sentinelRef} className="h-1" aria-hidden="true" />
        )}
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
