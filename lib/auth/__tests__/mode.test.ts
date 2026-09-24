import { describe, expect, it } from "vitest";

import { getAuthMode } from "../mode";

describe("getAuthMode", () => {
  it("retorna signin para undefined", () => {
    expect(getAuthMode(undefined)).toBe("signin");
  });

  it("retorna signin para string vazia", () => {
    expect(getAuthMode("")).toBe("signin");
  });

  it("retorna signin para valor inválido", () => {
    expect(getAuthMode("invalid")).toBe("signin");
  });

  it("retorna signin para o valor literal signin", () => {
    expect(getAuthMode("signin")).toBe("signin");
  });

  it("retorna signup para o valor literal signup", () => {
    expect(getAuthMode("signup")).toBe("signup");
  });

  it("retorna forgot para o valor literal forgot", () => {
    expect(getAuthMode("forgot")).toBe("forgot");
  });

  it("retorna update para o valor literal update", () => {
    expect(getAuthMode("update")).toBe("update");
  });

  it("é case-sensitive — maiúsculas caem no default signin", () => {
    expect(getAuthMode("SIGNUP")).toBe("signin");
    expect(getAuthMode("Forgot")).toBe("signin");
  });
});
