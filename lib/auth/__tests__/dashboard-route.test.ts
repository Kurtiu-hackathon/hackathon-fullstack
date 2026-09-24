import { describe, expect, it } from "vitest"

import { getDashboardByRole } from "../dashboard-route"

describe("getDashboardByRole", () => {
  it("retorna /super-admin para SUPER_ADMIN", () => {
    expect(getDashboardByRole("SUPER_ADMIN")).toBe("/super-admin")
  })

  it("retorna /admin para ADMIN", () => {
    expect(getDashboardByRole("ADMIN")).toBe("/admin")
  })

  it("retorna /moderator para MODERATOR", () => {
    expect(getDashboardByRole("MODERATOR")).toBe("/moderator")
  })

  it("retorna /dashboard para USER", () => {
    expect(getDashboardByRole("USER")).toBe("/dashboard")
  })

  it("retorna /dashboard quando role é undefined", () => {
    expect(getDashboardByRole(undefined)).toBe("/dashboard")
  })

  it("retorna /dashboard para role desconhecido", () => {
    expect(getDashboardByRole("UNKNOWN")).toBe("/dashboard")
  })
})
