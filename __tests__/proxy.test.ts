import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mockGetClaims = vi.hoisted(() => vi.fn());

vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({
    auth: { getClaims: mockGetClaims },
  }),
}));

import { proxy } from "../proxy";

function makeRequest(pathname: string, search = "") {
  return new NextRequest(new URL(`http://localhost${pathname}${search}`));
}

describe("proxy", () => {
  beforeEach(() => {
    mockGetClaims.mockResolvedValue({ data: { claims: { sub: "user-id" } } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("rotas não protegidas", () => {
    it("permite acesso à raiz /", async () => {
      const res = await proxy(makeRequest("/"));
      expect(res.headers.get("location")).toBeNull();
    });

    it("permite acesso a /login", async () => {
      const res = await proxy(makeRequest("/login"));
      expect(res.headers.get("location")).toBeNull();
    });

    it("permite acesso a /api/auth/callback", async () => {
      const res = await proxy(makeRequest("/api/auth/callback"));
      expect(res.headers.get("location")).toBeNull();
    });

    it("não protege /dashboard-admin (não é /dashboard nem começa com /dashboard/)", async () => {
      mockGetClaims.mockResolvedValue({ data: null });
      const res = await proxy(makeRequest("/dashboard-admin"));
      expect(res.headers.get("location")).toBeNull();
    });
  });

  describe("rotas protegidas sem sessão", () => {
    beforeEach(() => {
      mockGetClaims.mockResolvedValue({ data: null });
    });

    it("redireciona /dashboard para /login?next=%2Fdashboard", async () => {
      const res = await proxy(makeRequest("/dashboard"));
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?next=%2Fdashboard",
      );
    });

    it("redireciona /dashboard/settings para /login com next correto", async () => {
      const res = await proxy(makeRequest("/dashboard/settings"));
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?next=%2Fdashboard%2Fsettings",
      );
    });

    it("preserva query string no parâmetro next", async () => {
      const res = await proxy(makeRequest("/dashboard", "?tab=profile"));
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?next=%2Fdashboard%3Ftab%3Dprofile",
      );
    });
  });

  describe("rotas protegidas com sessão válida", () => {
    it("permite acesso a /dashboard", async () => {
      const res = await proxy(makeRequest("/dashboard"));
      expect(res.headers.get("location")).toBeNull();
    });

    it("permite acesso a /dashboard/settings", async () => {
      const res = await proxy(makeRequest("/dashboard/settings"));
      expect(res.headers.get("location")).toBeNull();
    });
  });
});
