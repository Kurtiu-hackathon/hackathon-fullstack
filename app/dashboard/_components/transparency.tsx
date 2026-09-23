import { Blueprint } from "@/components/ui/blueprint"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transparencyRows } from "../_data/transparency"

export function Transparency() {
  return (
    <section id="contas" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="mb-3 font-heading text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              06 — Transparência
            </p>

            <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Conta aberta, mês a mês
            </h2>
          </div>

          <a
            href="https://apoia.se/soujunior"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body border-b border-primary pb-0.5 text-sm text-primary no-underline transition-colors hover:border-accent-700 hover:text-accent-700"
          >
            Baixar relatório completo →
          </a>
        </div>

        <Blueprint>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-transparent">
                <TableHead className="px-5 py-4 font-heading text-xs font-semibold tracking-[0.12em] text-foreground uppercase">
                  Mês
                </TableHead>

                <TableHead className="px-5 py-4 font-heading text-xs font-semibold tracking-[0.12em] text-foreground uppercase">
                  Apoiadores
                </TableHead>

                <TableHead className="px-5 py-4 font-heading text-xs font-semibold tracking-[0.12em] text-foreground uppercase">
                  Arrecadado
                </TableHead>

                <TableHead className="px-5 py-4 font-heading text-xs font-semibold tracking-[0.12em] text-foreground uppercase">
                  Aplicado
                </TableHead>

                <TableHead className="px-5 py-4 font-heading text-xs font-semibold tracking-[0.12em] text-foreground uppercase">
                  Reserva
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transparencyRows.map((row) => (
                <TableRow
                  key={row.month}
                  className="border-b border-border last:border-b-0"
                >
                  <TableCell className="px-5 py-3.5 font-body text-sm font-semibold text-foreground">
                    {row.month}
                  </TableCell>

                  <TableCell className="px-5 py-3.5 font-body text-sm text-foreground">
                    {row.supporters}
                  </TableCell>

                  <TableCell className="px-5 py-3.5 font-body text-sm text-foreground">
                    {row.raised}
                  </TableCell>

                  <TableCell className="px-5 py-3.5 font-body text-sm text-foreground">
                    {row.applied}
                  </TableCell>

                  <TableCell className="px-5 py-3.5 font-body text-sm text-foreground">
                    {row.reserve}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Blueprint>
      </div>
    </section>
  )
}
