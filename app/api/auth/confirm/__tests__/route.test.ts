import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mockVerifyOtp = vi.hoisted(() => vi.fn());

vi.mock("@lib/supabase/server", () => ({
  createClient: () =>
    Promise.resolve({
      auth: { verifyOtp: mockVerifyOtp },
    }),
}));

import { GET } from "../route";

function makeRequest(params: Record<string, string>) {
  const url = new URL("http://localhost/api/auth/confirm");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return new NextRequest(url);
}

describe("GET /api/auth/confirm", () => {
  beforeEach(() => {
    mockVerifyOtp.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("type=email", () => {
    it("verifica OTP e redireciona para /dashboard quando bem-sucedido", async () => {
      const req = makeRequest({ token_hash: "abc123", type: "email" });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe("http://localhost/dashboard");
    });

    it("redireciona para /dashboard quando next é inválido", async () => {
      const req = makeRequest({
        token_hash: "abc123",
        type: "email",
        next: "https://evil.com",
      });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe("http://localhost/dashboard");
    });

    it("redireciona para next seguro quando fornecido", async () => {
      const req = makeRequest({
        token_hash: "abc123",
        type: "email",
        next: "/onboarding",
      });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe("http://localhost/onboarding");
    });

    it("redireciona para /login?error=email_confirmation quando verifyOtp falha", async () => {
      mockVerifyOtp.mockResolvedValue({ error: new Error("invalid token") });
      const req = makeRequest({ token_hash: "bad", type: "email" });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?error=email_confirmation",
      );
    });

    it("chama verifyOtp com os parâmetros corretos", async () => {
      const req = makeRequest({ token_hash: "tok-xyz", type: "email" });
      await GET(req);
      expect(mockVerifyOtp).toHaveBeenCalledWith({
        type: "email",
        token_hash: "tok-xyz",
      });
    });
  });

  describe("type=recovery", () => {
    it("verifica OTP e redireciona para /dashboard quando bem-sucedido", async () => {
      const req = makeRequest({ token_hash: "rec123", type: "recovery" });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe("http://localhost/dashboard");
    });

    it("redireciona para next seguro quando fornecido", async () => {
      const req = makeRequest({
        token_hash: "rec123",
        type: "recovery",
        next: "/login?mode=update",
      });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?mode=update",
      );
    });

    it("redireciona para recovery_link_invalid quando verifyOtp falha", async () => {
      mockVerifyOtp.mockResolvedValue({ error: new Error("expired") });
      const req = makeRequest({ token_hash: "expired", type: "recovery" });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?mode=forgot&error=recovery_link_invalid",
      );
    });

    it("redireciona para recovery_link_invalid quando token_hash está ausente", async () => {
      const req = makeRequest({ type: "recovery" });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?mode=forgot&error=recovery_link_invalid",
      );
    });
  });

  describe("parâmetros ausentes ou inválidos", () => {
    it("redireciona para email_confirmation quando nenhum parâmetro é fornecido", async () => {
      const req = makeRequest({});
      const res = await GET(req);
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?error=email_confirmation",
      );
    });

    it("redireciona para email_confirmation quando type é inválido", async () => {
      const req = makeRequest({ token_hash: "abc", type: "invalid_type" });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?error=email_confirmation",
      );
    });

    it("redireciona para email_confirmation quando só token_hash é fornecido", async () => {
      const req = makeRequest({ token_hash: "abc" });
      const res = await GET(req);
      expect(res.headers.get("location")).toBe(
        "http://localhost/login?error=email_confirmation",
      );
    });
  });
});
