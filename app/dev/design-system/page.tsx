"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Blueprint } from "@/components/ui/blueprint"
import { Duotone } from "@/components/ui/duotone"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  FileText,
  Italic,
  LayoutGrid,
  Settings,
  Underline,
  User,
} from "lucide-react"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h6 className="text-[var(--neutral-600)]">{title}</h6>
      {children}
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>
}

export default function DesignSystemPage() {
  return (
    <main
      className="min-h-screen p-12"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="mx-auto max-w-5xl flex flex-col gap-16">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1>Industry Design System</h1>
          <p className="text-[var(--neutral-600)]">
            Wireframe técnico / planta de engenharia — cantos retos, cards
            transparentes, acento único (aço), Lucide 1.5.
          </p>
          <Separator className="mt-4" />
        </header>

        {/* Typography */}
        <Section title="TIPOGRAFIA">
          <h1>H1 — Barlow Condensed 42px</h1>
          <h2>H2 — Barlow Condensed 32px</h2>
          <h3>H3 — Barlow Condensed 25px</h3>
          <h4>H4 — Barlow Condensed 20px</h4>
          <h5>H5 — Barlow Condensed 16px</h5>
          <h6>H6 — Barlow Condensed 13px uppercase</h6>
          <p>
            Corpo de texto — Barlow 15px/1.55. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore.
          </p>
          <p>
            <a href="#">Link no acento com sublinhado</a> e texto de corpo
            normal ao lado.
          </p>
        </Section>

        <Separator />

        {/* Buttons */}
        <Section title="BOTÕES">
          <Row>
            <Button variant="default">Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button variant="link">Link</Button>
          </Row>
          <Row>
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row>
            <Button size="icon" variant="outline">
              <Settings strokeWidth={1.5} />
            </Button>
            <Button size="icon">
              <User strokeWidth={1.5} />
            </Button>
            <Button variant="default" disabled>
              Desabilitado
            </Button>
          </Row>
        </Section>

        <Separator />

        {/* Cards */}
        <Section title="CARDS E BLUEPRINT">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Título do card</CardTitle>
                <CardDescription>
                  Card com fundo transparente e borda hairline. Marcas de
                  registro nos quatro cantos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo do card. Sem fundo sólido, sem sombra.</p>
              </CardContent>
              <CardFooter>
                <Button variant="default" size="sm">
                  Ação primária
                </Button>
                <Button variant="ghost" size="sm">
                  Cancelar
                </Button>
              </CardFooter>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>Card compacto</CardTitle>
                <CardDescription>Variante size=sm.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Badge variant="default">Acento</Badge>
                  <Badge variant="secondary">Neutro</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4">
            <Blueprint className="p-6 max-w-xs">
              <p className="text-sm">
                Componente <code>Blueprint</code> usado diretamente para
                emoldurar qualquer conteúdo.
              </p>
            </Blueprint>
          </div>
        </Section>

        <Separator />

        {/* Badges */}
        <Section title="BADGES / TAGS">
          <Row>
            <Badge variant="default">Acento</Badge>
            <Badge variant="secondary">Neutro</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Erro</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </Row>
          <Row>
            <Badge variant="default">
              <FileText size={12} strokeWidth={1.5} />
              Com ícone
            </Badge>
            <Badge variant="secondary">
              <LayoutGrid size={12} strokeWidth={1.5} />
              Layout
            </Badge>
          </Row>
        </Section>

        <Separator />

        {/* Inputs */}
        <Section title="CAMPOS DE FORMULÁRIO">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Seu nome completo" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="select-demo">Selecionar</Label>
              <Select>
                <SelectTrigger id="select-demo" className="w-full">
                  <SelectValue placeholder="Escolha uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="op1">Opção 1</SelectItem>
                  <SelectItem value="op2">Opção 2</SelectItem>
                  <SelectItem value="op3">Opção 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva em detalhes..."
              />
            </div>
          </div>
        </Section>

        <Separator />

        {/* Tabs */}
        <Section title="TABS — CONTROLE SEGMENTADO">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Visão geral</TabsTrigger>
              <TabsTrigger value="tab2">Detalhes</TabsTrigger>
              <TabsTrigger value="tab3">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p>Conteúdo da aba Visão geral.</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p>Conteúdo da aba Detalhes.</p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p>Conteúdo da aba Histórico.</p>
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="tab1" className="mt-4">
            <TabsList variant="line">
              <TabsTrigger value="tab1">Linha</TabsTrigger>
              <TabsTrigger value="tab2">Variante</TabsTrigger>
              <TabsTrigger value="tab3">Underline</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p>Variante line — underline no ativo.</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4" />
            <TabsContent value="tab3" className="mt-4" />
          </Tabs>
        </Section>

        <Separator />

        {/* Toggle Group */}
        <Section title="TOGGLE GROUP — SEGMENTADO">
          <Row>
            <ToggleGroup spacing={0}>
              <ToggleGroupItem value="left" aria-label="Alinhar esquerda">
                <AlignLeft strokeWidth={1.5} />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Centralizar">
                <AlignCenter strokeWidth={1.5} />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Alinhar direita">
                <AlignRight strokeWidth={1.5} />
              </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup spacing={0}>
              <ToggleGroupItem value="bold" aria-label="Negrito">
                <Bold strokeWidth={1.5} />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Itálico">
                <Italic strokeWidth={1.5} />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Sublinhado">
                <Underline strokeWidth={1.5} />
              </ToggleGroupItem>
            </ToggleGroup>
          </Row>
        </Section>

        <Separator />

        {/* Table */}
        <Section title="TABELA">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  proj: "Redesign portal",
                  status: "Em andamento",
                  resp: "Ana Lima",
                  data: "2026-09-15",
                },
                {
                  proj: "API v2",
                  status: "Concluído",
                  resp: "Carlos Souza",
                  data: "2026-08-30",
                },
                {
                  proj: "Design System",
                  status: "Revisão",
                  resp: "Marta Reis",
                  data: "2026-09-19",
                },
              ].map((row) => (
                <TableRow key={row.proj}>
                  <TableCell className="font-medium">{row.proj}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "Concluído"
                          ? "default"
                          : row.status === "Em andamento"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.resp}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.data}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Separator />

        {/* Form controls */}
        <Section title="CONTROLES — CHECKBOX / RADIO / SWITCH">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h6>Checkboxes</h6>
              {["Opção A", "Opção B", "Opção C"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <Checkbox id={label} defaultChecked={label === "Opção A"} />
                  <Label htmlFor={label}>{label}</Label>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h6>Radio Group</h6>
              <RadioGroup defaultValue="r1">
                {[
                  { value: "r1", label: "Opção 1" },
                  { value: "r2", label: "Opção 2" },
                  { value: "r3", label: "Opção 3" },
                ].map((item) => (
                  <div key={item.value} className="flex items-center gap-2">
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label htmlFor={item.value}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
              <h6>Switches</h6>
              {[
                { id: "sw1", label: "Notificações", checked: true },
                { id: "sw2", label: "Dark mode", checked: false },
                { id: "sw3", label: "Compact", checked: false },
              ].map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Switch
                    id={item.id}
                    defaultChecked={item.checked}
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Separator />

        {/* Overlays */}
        <Section title="SOBREPOSIÇÕES — DIALOG / SHEET">
          <Row>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Abrir Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar ação</DialogTitle>
                  <DialogDescription>
                    Esta ação não pode ser desfeita. Confirme para continuar.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                  <Button variant="default" size="sm">
                    Confirmar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Abrir Sheet
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Painel lateral</SheetTitle>
                  <SheetDescription>
                    Sheet com borda hairline e sombra Industry.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="sheet-input">Campo</Label>
                    <Input id="sheet-input" placeholder="Digite algo..." />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </Row>
        </Section>

        <Separator />

        {/* Duotone */}
        <Section title="DUOTONE — TRATAMENTO DE IMAGEM">
          <Row>
            <Duotone className="w-48 h-32 rounded-none">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80"
                alt="Exemplo duotone — placa de circuito"
                className="w-full h-full object-cover"
              />
            </Duotone>
            <p className="text-sm text-muted-foreground max-w-xs">
              Wrapper <code>Duotone</code>: dessatura a imagem e aplica blend{" "}
              <em>color</em> no acento aço.
            </p>
          </Row>
        </Section>
      </div>
    </main>
  )
}
