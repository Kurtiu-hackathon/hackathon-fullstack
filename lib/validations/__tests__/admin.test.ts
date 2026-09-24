import { describe, expect, it } from "vitest"

import { banUserSchema, updateRoleSchema } from "../admin"

const validUuid = "12345678-1234-4234-8234-123456789abc"

describe("updateRoleSchema", () => {
  it("valida userId e newRole corretos", () => {
    expect(updateRoleSchema.safeParse({ userId: validUuid, newRole: "ADMIN" }).success).toBe(true)
  })

  it("rejeita userId que não é UUID", () => {
    const result = updateRoleSchema.safeParse({ userId: "not-a-uuid", newRole: "ADMIN" })
    expect(result.success).toBe(false)
    expect(result.error?.issues.find((i) => i.path.includes("userId"))).toBeDefined()
  })

  it("rejeita newRole inválido", () => {
    const result = updateRoleSchema.safeParse({ userId: validUuid, newRole: "OWNER" })
    expect(result.success).toBe(false)
    expect(result.error?.issues.find((i) => i.path.includes("newRole"))).toBeDefined()
  })

  it("aceita todos os papéis válidos", () => {
    const roles = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"] as const
    for (const role of roles) {
      expect(updateRoleSchema.safeParse({ userId: validUuid, newRole: role }).success).toBe(true)
    }
  })
})

describe("banUserSchema", () => {
  it("valida userId correto", () => {
    expect(banUserSchema.safeParse({ userId: validUuid }).success).toBe(true)
  })

  it("rejeita userId que não é UUID", () => {
    const result = banUserSchema.safeParse({ userId: "not-valid" })
    expect(result.success).toBe(false)
    expect(result.error?.issues.find((i) => i.path.includes("userId"))).toBeDefined()
  })

  it("rejeita userId vazio", () => {
    expect(banUserSchema.safeParse({ userId: "" }).success).toBe(false)
  })
})
