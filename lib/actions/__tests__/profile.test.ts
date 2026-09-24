import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const mockHeaders = vi.hoisted(() => vi.fn())
const mockUpdateUser = vi.hoisted(() => vi.fn())
const mockGetUserIdentities = vi.hoisted(() => vi.fn())
const mockUnlinkIdentity = vi.hoisted(() => vi.fn())
const mockLinkIdentity = vi.hoisted(() => vi.fn())

vi.mock("next/headers", () => ({
  headers: mockHeaders,
}))

vi.mock("@lib/supabase/server", () => ({
  createClient: async () => ({
    auth: {
      updateUser: mockUpdateUser,
      getUserIdentities: mockGetUserIdentities,
      unlinkIdentity: mockUnlinkIdentity,
      linkIdentity: mockLinkIdentity,
    },
  }),
}))

import { disconnectIdentity, linkDiscordIdentity, linkGoogleIdentity, updateProfile } from "../profile"

const mockHeadersValue = {
  get: (key: string) => {
    if (key === "x-forwarded-host") return null
    if (key === "host") return "localhost:3000"
    if (key === "x-forwarded-proto") return "http"
    return null
  },
}

const validProfileValues = { displayName: "John Doe", avatarPhoto: "avatar-url" }

describe("updateProfile", () => {
  beforeEach(() => {
    mockUpdateUser.mockResolvedValue({ error: null })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("retorna sucesso com dados válidos", async () => {
    const result = await updateProfile(validProfileValues)
    expect(result).toEqual({ status: "success", message: "Perfil atualizado com sucesso." })
  })

  it("chama updateUser com display_name e avatar_photo corretos", async () => {
    await updateProfile(validProfileValues)
    expect(mockUpdateUser).toHaveBeenCalledWith({
      data: { display_name: "John Doe", avatar_photo: "avatar-url" },
    })
  })

  it("retorna erro de validação quando displayName é curto demais", async () => {
    const result = await updateProfile({ displayName: "Jo", avatarPhoto: "url" })
    expect(result).toMatchObject({ status: "error" })
    expect(mockUpdateUser).not.toHaveBeenCalled()
  })

  it("retorna erro de validação quando displayName excede 32 caracteres", async () => {
    const result = await updateProfile({ displayName: "A".repeat(33), avatarPhoto: "url" })
    expect(result).toMatchObject({ status: "error" })
    expect(mockUpdateUser).not.toHaveBeenCalled()
  })

  it("retorna erro de validação quando avatarPhoto está vazio", async () => {
    const result = await updateProfile({ displayName: "John", avatarPhoto: "" })
    expect(result).toMatchObject({ status: "error" })
    expect(mockUpdateUser).not.toHaveBeenCalled()
  })

  it("retorna erro quando updateUser falha", async () => {
    mockUpdateUser.mockResolvedValue({ error: { code: "invalid_credentials" } })
    const result = await updateProfile(validProfileValues)
    expect(result).toMatchObject({ status: "error" })
  })
})

describe("disconnectIdentity", () => {
  const identity = { identity_id: "identity-1", provider: "google" }

  beforeEach(() => {
    mockGetUserIdentities.mockResolvedValue({ data: { identities: [identity] }, error: null })
    mockUnlinkIdentity.mockResolvedValue({ error: null })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("retorna sucesso ao desconectar identidade existente", async () => {
    const result = await disconnectIdentity("identity-1")
    expect(result).toEqual({ status: "success", message: "Conta desconectada com sucesso." })
  })

  it("chama unlinkIdentity com o objeto de identidade correto", async () => {
    await disconnectIdentity("identity-1")
    expect(mockUnlinkIdentity).toHaveBeenCalledWith(identity)
  })

  it("retorna erro quando identidade não é encontrada", async () => {
    const result = await disconnectIdentity("identity-not-found")
    expect(result).toMatchObject({ status: "error", message: "Conta não encontrada." })
    expect(mockUnlinkIdentity).not.toHaveBeenCalled()
  })

  it("retorna erro quando getUserIdentities falha", async () => {
    mockGetUserIdentities.mockResolvedValue({ data: null, error: { message: "network error" } })
    const result = await disconnectIdentity("identity-1")
    expect(result).toMatchObject({ status: "error" })
  })

  it("retorna erro quando unlinkIdentity falha", async () => {
    mockUnlinkIdentity.mockResolvedValue({ error: { code: "invalid_credentials" } })
    const result = await disconnectIdentity("identity-1")
    expect(result).toMatchObject({ status: "error" })
  })
})

describe("linkGoogleIdentity", () => {
  beforeEach(() => {
    mockHeaders.mockResolvedValue(mockHeadersValue)
    mockLinkIdentity.mockResolvedValue({ data: { url: "https://accounts.google.com/oauth" }, error: null })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("retorna url de redirecionamento em caso de sucesso", async () => {
    const result = await linkGoogleIdentity()
    expect(result).toEqual({ status: "redirect", url: "https://accounts.google.com/oauth" })
  })

  it("chama linkIdentity com provider google e redirectTo contendo /api/auth/callback", async () => {
    await linkGoogleIdentity()
    expect(mockLinkIdentity).toHaveBeenCalledWith({
      provider: "google",
      options: expect.objectContaining({
        redirectTo: expect.stringContaining("/api/auth/callback"),
      }),
    })
  })

  it("retorna erro quando linkIdentity falha", async () => {
    mockLinkIdentity.mockResolvedValue({ data: { url: null }, error: { code: "provider_disabled" } })
    const result = await linkGoogleIdentity()
    expect(result).toMatchObject({ status: "error" })
  })

  it("retorna erro quando url está ausente sem error", async () => {
    mockLinkIdentity.mockResolvedValue({ data: { url: null }, error: null })
    const result = await linkGoogleIdentity()
    expect(result).toMatchObject({ status: "error" })
  })
})

describe("linkDiscordIdentity", () => {
  beforeEach(() => {
    mockHeaders.mockResolvedValue(mockHeadersValue)
    mockLinkIdentity.mockResolvedValue({ data: { url: "https://discord.com/oauth" }, error: null })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("retorna url de redirecionamento em caso de sucesso", async () => {
    const result = await linkDiscordIdentity()
    expect(result).toEqual({ status: "redirect", url: "https://discord.com/oauth" })
  })

  it("chama linkIdentity com provider discord", async () => {
    await linkDiscordIdentity()
    expect(mockLinkIdentity).toHaveBeenCalledWith(
      expect.objectContaining({ provider: "discord" }),
    )
  })

  it("retorna erro quando linkIdentity falha", async () => {
    mockLinkIdentity.mockResolvedValue({ data: { url: null }, error: { code: "provider_disabled" } })
    const result = await linkDiscordIdentity()
    expect(result).toMatchObject({ status: "error" })
  })
})
