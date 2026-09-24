export type AuditAction =
  | "login"
  | "logout"
  | "role_change"
  | "ban"
  | "delete"
  | "export"
  | "approve"
  | "reject"

export type MockAuditEntry = {
  id: string
  actor: string
  actorRole: string
  action: AuditAction
  description: string
  target: string
  ip: string
  when: string
}

export const AUDIT_ENTRIES: MockAuditEntry[] = [
  { id: "a1", actor: "Ana Carvalho", actorRole: "SUPER_ADMIN", action: "role_change", description: "Alterou papel de @novo_mod para Moderador", target: "@novo_mod", ip: "189.40.12.88", when: "23 set · 14:05" },
  { id: "a2", actor: "Bruno Melo", actorRole: "ADMIN", action: "export", description: "Exportou relatório de doações · setembro", target: "finanças", ip: "200.148.20.11", when: "23 set · 13:20" },
  { id: "a3", actor: "Camila Reis", actorRole: "MODERADOR", action: "ban", description: "Baniu usuário @spammer99", target: "@spammer99", ip: "177.92.44.5", when: "23 set · 12:48" },
  { id: "a4", actor: "Bruno Melo", actorRole: "ADMIN", action: "approve", description: "Aprovou evento Hackathon SP 2024", target: "evento #e1", ip: "200.148.20.11", when: "23 set · 11:30" },
  { id: "a5", actor: "Camila Reis", actorRole: "MODERADOR", action: "delete", description: "Removeu publicação de @usuario_xyz", target: "post #p5", ip: "177.92.44.5", when: "23 set · 10:15" },
  { id: "a6", actor: "Ana Carvalho", actorRole: "SUPER_ADMIN", action: "login", description: "Login no console", target: "—", ip: "189.40.12.88", when: "23 set · 09:02" },
]

export const ACTION_LABELS: Record<AuditAction, string> = {
  login: "Login",
  logout: "Logout",
  role_change: "Alteração de papel",
  ban: "Banimento",
  delete: "Exclusão",
  export: "Exportação",
  approve: "Aprovação",
  reject: "Rejeição",
}
