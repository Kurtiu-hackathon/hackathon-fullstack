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
    <section
      id="contas"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-7">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              06 — Transparência
            </p>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Conta aberta, mês a mês
            </h2>
          </div>

          <a
            href="https://apoia.se/soujunior"
            target="_blank"
            rel="noopener"
            className="border-b border-primary pb-0.5 text-sm no-underline"
          >
            Baixar relatório completo →
          </a>
        </div>

        <Blueprint>
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/8">
                <TableHead className="px-5 py-4">Mês</TableHead>
                <TableHead className="px-5 py-4">Apoiadores</TableHead>
                <TableHead className="px-5 py-4">Arrecadado</TableHead>
                <TableHead className="px-5 py-4">Aplicado</TableHead>
                <TableHead className="px-5 py-4">Reserva</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transparencyRows.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="px-5 py-3.5 font-medium">
                    {row.month}
                  </TableCell>
                  <TableCell className="px-5 py-3.5">{row.supporters}</TableCell>
                  <TableCell className="px-5 py-3.5">{row.raised}</TableCell>
                  <TableCell className="px-5 py-3.5">{row.applied}</TableCell>
                  <TableCell className="px-5 py-3.5">{row.reserve}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Blueprint>
      </div>
    </section>
  )
}
