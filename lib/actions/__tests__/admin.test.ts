import { beforeEach, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({ claims: vi.fn(), list: vi.fn(), get: vi.fn(), update: vi.fn() }))
vi.mock("@lib/supabase/server", () => ({ createClient: async () => ({ auth: { getClaims: mocks.claims } }) }))
vi.mock("@lib/supabase/admin", () => ({ createAdminClient: () => ({ auth: { admin: { listUsers: mocks.list, getUserById: mocks.get, updateUserById: mocks.update } } }) }))
import { banUser, getUserById, listUsers, unbanUser, updateUserRole } from "../admin"

const id = "12345678-1234-4234-8234-123456789abc"
const target = { id, email: "target@example.com", created_at: "2023-01-12", user_metadata: { display_name: "Target" }, app_metadata: { role: "USER", status: "ativo", other: "preserved" } }
beforeEach(() => {
  vi.resetAllMocks()
  mocks.claims.mockResolvedValue({ data: { claims: { sub: "caller", app_metadata: { role: "SUPER_ADMIN" } } } })
  mocks.get.mockResolvedValue({ data: { user: target }, error: null })
  mocks.update.mockResolvedValue({ error: null })
})
it("searches beyond the first 500 users and keeps the global total", async () => {
  mocks.list.mockResolvedValueOnce({ data: { users: [], total: 501, lastPage: 2 }, error: null })
  mocks.list.mockResolvedValueOnce({ data: { users: [target], total: 501, lastPage: 2 }, error: null })
  const result = await listUsers({ perPage: 500, search: "target" })
  expect(mocks.list).toHaveBeenLastCalledWith({ page: 2, perPage: 500 })
  expect(result).toMatchObject({ status: "success", data: { total: 501, users: [{ id }] } })
})
it("does not return incomplete search results when a later page fails", async () => {
  mocks.list.mockResolvedValueOnce({ data: { users: [], total: 501, lastPage: 2 }, error: null })
  mocks.list.mockResolvedValueOnce({ error: { message: "offline" } })
  expect(await listUsers({ perPage: 500, status: "banido" })).toMatchObject({ status: "error" })
})
it("keeps normal listing paginated", async () => {
  mocks.list.mockResolvedValue({ data: { users: [target], total: 501, lastPage: 26 }, error: null })
  await listUsers({ perPage: 20 })
  expect(mocks.list).toHaveBeenCalledOnce()
})
it("loads profile data", async () => {
  expect(await getUserById(id)).toMatchObject({ status: "success", data: { id, name: "Target" } })
})
it("persists bans and preserves unrelated metadata", async () => {
  expect(await banUser(id)).toMatchObject({ status: "success" })
  expect(mocks.update).toHaveBeenCalledWith(id, { ban_duration: "87600h", app_metadata: { ...target.app_metadata, status: "banido" } })
})
it("persists role changes", async () => {
  expect(await updateUserRole(id, "ADMIN")).toMatchObject({ status: "success" })
  expect(mocks.update).toHaveBeenCalledWith(id, { app_metadata: { ...target.app_metadata, role: "ADMIN" } })
})
it("rejects self bans and self role changes", async () => {
  mocks.claims.mockResolvedValue({ data: { claims: { sub: id, app_metadata: { role: "SUPER_ADMIN" } } } })
  expect(await banUser(id)).toMatchObject({ status: "error" })
  expect(await updateUserRole(id, "USER")).toMatchObject({ status: "error" })
  expect(mocks.update).not.toHaveBeenCalled()
})
it("rejects unauthorized access", async () => {
  mocks.claims.mockResolvedValue({ data: { claims: { sub: "caller", app_metadata: { role: "USER" } } } })
  expect(await listUsers()).toMatchObject({ status: "error" })
  expect(await getUserById(id)).toMatchObject({ status: "error" })
  expect(await banUser(id)).toMatchObject({ status: "error" })
  expect(await updateUserRole(id, "ADMIN")).toMatchObject({ status: "error" })
  expect(mocks.update).not.toHaveBeenCalled()
})
it("remove banimento e restaura status ativo", async () => {
  mocks.get.mockResolvedValueOnce({ data: { user: { ...target, app_metadata: { ...target.app_metadata, status: "banido" } } }, error: null })
  expect(await unbanUser(id)).toMatchObject({ status: "success" })
  expect(mocks.update).toHaveBeenCalledWith(id, { ban_duration: "none", app_metadata: { ...target.app_metadata, status: "ativo" } })
})
it("rejeita desbanimento quando usuário não está banido", async () => {
  expect(await unbanUser(id)).toMatchObject({ status: "error" })
  expect(mocks.update).not.toHaveBeenCalled()
})
