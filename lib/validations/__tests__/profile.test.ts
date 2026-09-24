import { describe, expect, it } from "vitest"

import { profileSchema } from "../profile"

describe("profileSchema", () => {
  it("valida displayName e avatarPhoto corretos", () => {
    expect(profileSchema.safeParse({ displayName: "John Doe", avatarPhoto: "url" }).success).toBe(true)
  })

  it("rejeita displayName com menos de 3 caracteres", () => {
    const result = profileSchema.safeParse({ displayName: "Jo", avatarPhoto: "url" })
    expect(result.success).toBe(false)
    expect(result.error?.issues.find((i) => i.path.includes("displayName"))).toBeDefined()
  })

  it("rejeita displayName com mais de 32 caracteres", () => {
    const result = profileSchema.safeParse({ displayName: "A".repeat(33), avatarPhoto: "url" })
    expect(result.success).toBe(false)
    expect(result.error?.issues.find((i) => i.path.includes("displayName"))).toBeDefined()
  })

  it("aplica trim no displayName", () => {
    const result = profileSchema.safeParse({ displayName: "  John  ", avatarPhoto: "url" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.displayName).toBe("John")
    }
  })

  it("rejeita displayName vazio após trim", () => {
    expect(profileSchema.safeParse({ displayName: "   ", avatarPhoto: "url" }).success).toBe(false)
  })

  it("rejeita avatarPhoto vazio", () => {
    const result = profileSchema.safeParse({ displayName: "John", avatarPhoto: "" })
    expect(result.success).toBe(false)
    expect(result.error?.issues.find((i) => i.path.includes("avatarPhoto"))).toBeDefined()
  })
})
