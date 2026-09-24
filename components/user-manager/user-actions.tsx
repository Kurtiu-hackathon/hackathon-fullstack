"use client"

import { useRef, useState, type ComponentProps } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@lib/utils"
import { banUser, getUserById, updateUserRole, type AdminUser } from "@lib/actions/admin"
import { updateRoleSchema, USER_ROLES, type UpdateRoleValues } from "@lib/validations/admin"
import { Button } from "@components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"

const LABELS = { USER: "Usuário", MODERATOR: "Moderador", ADMIN: "Admin", SUPER_ADMIN: "Super Admin" }
type Mode = "profile" | "role" | "ban"
type Props = ComponentProps<"div"> & { user: AdminUser; canEditRole?: boolean; onChanged: () => void }

export function UserActions({ user, canEditRole = false, onChanged, className, ...props }: Props) {
  const [mode, setMode] = useState<Mode>("profile")
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState<AdminUser | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState("")
  const request = useRef(0)
  const mutationPending = useRef(false)
  const form = useForm<UpdateRoleValues>({ resolver: zodResolver(updateRoleSchema), defaultValues: { userId: user.id, newRole: user.role } })

  async function show(next: Mode) {
    const version = ++request.current
    setMode(next)
    setError(null)
    setNotice("")
    setProfile(null)
    form.reset({ userId: user.id, newRole: user.role })
    setBusy(next === "profile")
    if (next !== "profile") return
    try {
      const result = await getUserById(user.id)
      if (version !== request.current) return
      if (result.status === "error") setError(result.message)
      else if (result.data) setProfile(result.data)
    } catch {
      if (version === request.current) setError("Não foi possível carregar o perfil.")
    } finally {
      if (version === request.current) setBusy(false)
    }
  }

  async function save(values?: UpdateRoleValues) {
    if (mutationPending.current) return
    mutationPending.current = true
    setBusy(true)
    setError(null)
    try {
      const result = values ? await updateUserRole(values.userId, values.newRole) : await banUser(user.id)
      if (result.status === "error") { setError(result.message); return }
      setNotice(result.message)
    } catch {
      setError("Não foi possível concluir a ação. Tente novamente.")
    } finally {
      mutationPending.current = false
      setBusy(false)
    }
  }

  return (
    <div className={cn("flex justify-end gap-1.5", className)} {...props}>
      <Dialog open={open} onOpenChange={(value) => {
        if (mutationPending.current) return
        setOpen(value)
        if (!value) {
          request.current++
          if (notice) onChanged()
        }
      }}>
        <DialogTrigger render={<Button variant="outline" size="sm" className="min-h-11 sm:min-h-7" />} onClick={() => void show("profile")}>Ver</DialogTrigger>
        {canEditRole && <DialogTrigger render={<Button variant="outline" size="sm" className="min-h-11 sm:min-h-7" />} onClick={() => void show("role")}>Editar papel</DialogTrigger>}
        {user.status !== "banido" && <DialogTrigger render={<Button variant="outline" size="sm" className="min-h-11 sm:min-h-7 text-destructive" />} onClick={() => void show("ban")}>Banir</DialogTrigger>}
        <DialogContent className="max-h-[85vh] overflow-y-auto text-left" showCloseButton={!busy}>
          <DialogHeader>
            <DialogTitle>{mode === "profile" ? "Perfil do usuário" : mode === "role" ? "Editar papel" : "Banir usuário"}</DialogTitle>
            <DialogDescription>{user.name || user.email}</DialogDescription>
          </DialogHeader>
          {error && <p role="alert" className="text-destructive">{error}</p>}
          {notice ? <p role="status">{notice}</p> : mode === "profile" ? (
            busy ? <p role="status">Carregando perfil…</p> : profile && <dl className="grid gap-3 break-words">
              {Object.entries({ Nome: profile.name || "—", "E-mail": profile.email, Papel: LABELS[profile.role], Status: profile.status, Cadastro: new Date(profile.joinedAt).toLocaleDateString("pt-BR"), "Último acesso": profile.lastLogin ? new Date(profile.lastLogin).toLocaleDateString("pt-BR") : "—", ID: profile.id }).map(([label, value]) => <div key={label}><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>)}
            </dl>
          ) : mode === "role" ? (
            <form onSubmit={(event) => void form.handleSubmit(save)(event)} className="flex flex-col gap-4">
              <Controller control={form.control} name="newRole" render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`role-${user.id}`}>Papel</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={busy}>
                    <SelectTrigger id={`role-${user.id}`} ref={field.ref} onBlur={field.onBlur} aria-invalid={fieldState.invalid} className="min-h-11 w-full"><SelectValue>{LABELS[field.value]}</SelectValue></SelectTrigger>
                    <SelectContent>{USER_ROLES.map((role) => <SelectItem key={role} value={role}>{LABELS[role]}</SelectItem>)}</SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )} />
              <Button type="submit" disabled={busy}>{busy ? "Salvando…" : "Salvar papel"}</Button>
            </form>
          ) : <div className="flex flex-col gap-4">
            <p>O banimento bloqueará o acesso desta conta à plataforma. Deseja continuar?</p>
            <Button variant="destructive" disabled={busy} onClick={() => void save()}>{busy ? "Banindo…" : "Confirmar banimento"}</Button>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  )
}
