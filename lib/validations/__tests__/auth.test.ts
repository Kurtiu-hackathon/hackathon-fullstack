import { describe, expect, it } from "vitest";

import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
  updatePasswordSchema,
} from "../auth";

describe("signInSchema", () => {
  it("valida campos corretos", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "anypassword",
      passwordConfirmation: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita e-mail inválido", () => {
    const result = signInSchema.safeParse({
      email: "not-an-email",
      password: "anypassword",
      passwordConfirmation: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("email");
  });

  it("rejeita e-mail vazio", () => {
    const result = signInSchema.safeParse({
      email: "",
      password: "anypassword",
      passwordConfirmation: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("email");
  });

  it("rejeita senha vazia", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "",
      passwordConfirmation: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("password");
  });

  it("aplica trim no e-mail", () => {
    const result = signInSchema.safeParse({
      email: "  user@example.com  ",
      password: "anypassword",
      passwordConfirmation: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });
});

describe("signUpSchema", () => {
  it("valida campos corretos com senhas iguais", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "strongpass",
      passwordConfirmation: "strongpass",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita senha com menos de 8 caracteres", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "short",
      passwordConfirmation: "short",
    });
    expect(result.success).toBe(false);
    const passwordError = result.error?.issues.find((i) =>
      i.path.includes("password"),
    );
    expect(passwordError).toBeDefined();
  });

  it("rejeita quando senhas não coincidem", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "strongpass1",
      passwordConfirmation: "strongpass2",
    });
    expect(result.success).toBe(false);
    const confirmError = result.error?.issues.find((i) =>
      i.path.includes("passwordConfirmation"),
    );
    expect(confirmError).toBeDefined();
    expect(confirmError?.message).toBe("As senhas não coincidem.");
  });

  it("rejeita confirmação vazia", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "strongpass",
      passwordConfirmation: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    const result = signUpSchema.safeParse({
      email: "bademail",
      password: "strongpass",
      passwordConfirmation: "strongpass",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("email");
  });
});

describe("forgotPasswordSchema", () => {
  it("valida e-mail correto", () => {
    const result = forgotPasswordSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejeita e-mail inválido", () => {
    const result = forgotPasswordSchema.safeParse({ email: "notanemail" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("email");
  });

  it("rejeita e-mail vazio", () => {
    const result = forgotPasswordSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });
});

describe("updatePasswordSchema", () => {
  it("valida senhas iguais com mínimo de 8 caracteres", () => {
    const result = updatePasswordSchema.safeParse({
      password: "newpassword",
      passwordConfirmation: "newpassword",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita senha com menos de 8 caracteres", () => {
    const result = updatePasswordSchema.safeParse({
      password: "short",
      passwordConfirmation: "short",
    });
    expect(result.success).toBe(false);
    const passwordError = result.error?.issues.find((i) =>
      i.path.includes("password"),
    );
    expect(passwordError).toBeDefined();
  });

  it("rejeita quando senhas não coincidem", () => {
    const result = updatePasswordSchema.safeParse({
      password: "newpassword1",
      passwordConfirmation: "newpassword2",
    });
    expect(result.success).toBe(false);
    const confirmError = result.error?.issues.find((i) =>
      i.path.includes("passwordConfirmation"),
    );
    expect(confirmError?.message).toBe("As senhas não coincidem.");
  });

  it("rejeita confirmação vazia", () => {
    const result = updatePasswordSchema.safeParse({
      password: "newpassword",
      passwordConfirmation: "",
    });
    expect(result.success).toBe(false);
  });
});
