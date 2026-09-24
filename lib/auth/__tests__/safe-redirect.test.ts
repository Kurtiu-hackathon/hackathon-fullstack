import { describe, expect, it } from "vitest";

import { buildAuthCallbackUrl, getSafeRedirectPath } from "../safe-redirect";

describe("getSafeRedirectPath", () => {
  it("retorna /dashboard para undefined", () => {
    expect(getSafeRedirectPath(undefined)).toBe("/dashboard");
  });

  it("retorna /dashboard para null", () => {
    expect(getSafeRedirectPath(null)).toBe("/dashboard");
  });

  it("retorna /dashboard para string vazia", () => {
    expect(getSafeRedirectPath("")).toBe("/dashboard");
  });

  it("retorna /dashboard para URL absoluta https://", () => {
    expect(getSafeRedirectPath("https://evil.com/steal")).toBe("/dashboard");
  });

  it("retorna /dashboard para URL com protocolo //", () => {
    expect(getSafeRedirectPath("//evil.com")).toBe("/dashboard");
  });

  it("retorna /dashboard para string sem barra inicial", () => {
    expect(getSafeRedirectPath("about")).toBe("/dashboard");
  });

  it("aceita caminho relativo simples", () => {
    expect(getSafeRedirectPath("/about")).toBe("/about");
  });

  it("aceita caminho aninhado", () => {
    expect(getSafeRedirectPath("/dashboard/settings")).toBe(
      "/dashboard/settings",
    );
  });

  it("preserva query string", () => {
    expect(getSafeRedirectPath("/login?mode=signup")).toBe("/login?mode=signup");
  });

  it("preserva hash", () => {
    expect(getSafeRedirectPath("/page#section")).toBe("/page#section");
  });

  it("preserva query string e hash juntos", () => {
    expect(getSafeRedirectPath("/page?foo=bar#section")).toBe(
      "/page?foo=bar#section",
    );
  });
});

describe("buildAuthCallbackUrl", () => {
  it("gera URL de callback com next seguro", () => {
    const url = buildAuthCallbackUrl("http://localhost:3000", "/dashboard");
    expect(url).toBe(
      "http://localhost:3000/api/auth/callback?next=%2Fdashboard",
    );
  });

  it("usa /dashboard como next quando o valor é inválido", () => {
    const url = buildAuthCallbackUrl(
      "http://localhost:3000",
      "https://evil.com",
    );
    expect(url).toBe(
      "http://localhost:3000/api/auth/callback?next=%2Fdashboard",
    );
  });

  it("usa /dashboard como next quando next é undefined", () => {
    const url = buildAuthCallbackUrl("http://localhost:3000");
    expect(url).toBe(
      "http://localhost:3000/api/auth/callback?next=%2Fdashboard",
    );
  });
});
