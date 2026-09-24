import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockExchangeCodeForSession = vi.hoisted(() => vi.fn());

vi.mock("@lib/supabase/server", () => ({
  createClient: () =>
    Promise.resolve({
      auth: { exchangeCodeForSession: mockExchangeCodeForSession },
    }),
}));

import { GET } from "../route";

describe("GET /api/auth/callback", () => {
  beforeEach(() => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("redireciona para /dashboard quando code é válido e next está ausente", async () => {
    const req = new Request(
      "http://localhost/api/auth/callback?code=valid-code",
    );
    const res = await GET(req);
    expect(res.headers.get("location")).toBe("http://localhost/dashboard");
  });

  it("redireciona para o caminho seguro em next quando code é válido", async () => {
    const req = new Request(
      "http://localhost/api/auth/callback?code=valid-code&next=%2Fprofile",
    );
    const res = await GET(req);
    expect(res.headers.get("location")).toBe("http://localhost/profile");
  });

  it("ignora next com URL absoluta e redireciona para /dashboard", async () => {
    const req = new Request(
      "http://localhost/api/auth/callback?code=valid-code&next=https%3A%2F%2Fevil.com",
    );
    const res = await GET(req);
    expect(res.headers.get("location")).toBe("http://localhost/dashboard");
  });

  it("redireciona para /login?error=oauth_callback quando code está ausente", async () => {
    const req = new Request("http://localhost/api/auth/callback");
    const res = await GET(req);
    expect(res.headers.get("location")).toBe(
      "http://localhost/login?error=oauth_callback",
    );
  });

  it("redireciona para /login?error=oauth_callback quando exchangeCodeForSession falha", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      error: new Error("invalid code"),
    });
    const req = new Request(
      "http://localhost/api/auth/callback?code=bad-code",
    );
    const res = await GET(req);
    expect(res.headers.get("location")).toBe(
      "http://localhost/login?error=oauth_callback",
    );
  });

  it("chama exchangeCodeForSession com o code recebido", async () => {
    const req = new Request(
      "http://localhost/api/auth/callback?code=my-code-123",
    );
    await GET(req);
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("my-code-123");
  });
});
