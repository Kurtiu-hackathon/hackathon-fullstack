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
import { POSTS, STATUS_POST_COLORS, type PostStatus } from "@lib/mock/admin/posts"

const ALL_STATUSES: PostStatus[] = ["publicado", "pendente", "denunciado", "removido"]

export function ModeratorPosts() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<PostStatus | "todos">("todos")

  const filtered = POSTS.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.author.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === "todos" || p.status === filter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="max-w-lg text-[13.5px] leading-relaxed text-muted-foreground">
            Revise e modere publicações. Itens denunciados devem ser tratados com prioridade.
          </p>
          {POSTS.filter((p) => p.status === "denunciado").length > 0 && (
            <p className="mt-1 inline-block bg-orange-50 px-2 py-1 text-[12.5px] text-orange-800 border border-orange-200">
              {POSTS.filter((p) => p.status === "denunciado").length} publicações denunciadas aguardando revisão
            </p>
          )}
        </div>
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
              placeholder="Buscar publicações…"
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
              Todos <span className="opacity-60">{POSTS.length}</span>
            </Button>
            {ALL_STATUSES.map((s) => {
              const count = POSTS.filter((p) => p.status === s).length
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
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Denúncias</TableHead>
              <TableHead>Data</TableHead>
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
              filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="max-w-[240px]">
                    <p className="truncate font-medium">{post.title}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{post.author}</TableCell>
                  <TableCell className="text-muted-foreground">{post.category}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-medium ${STATUS_POST_COLORS[post.status]}`}
                    >
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {post.reports > 0 ? (
                      <span className="font-heading font-bold text-destructive">{post.reports}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{post.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      {post.status === "pendente" && (
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px]">
                          Aprovar
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]">
                        Ver
                      </Button>
                      {post.status !== "removido" && (
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10">
                          Remover
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
    </div>
  )
}
