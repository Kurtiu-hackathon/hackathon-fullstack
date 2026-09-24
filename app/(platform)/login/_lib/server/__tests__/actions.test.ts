import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockRedirect = vi.hoisted(() => vi.fn());
const mockHeaders = vi.hoisted(() => vi.fn());
const mockSignInWithPassword = vi.hoisted(() => vi.fn());
const mockSignUp = vi.hoisted(() => vi.fn());
const mockSignInWithOAuth = vi.hoisted(() => vi.fn());
const mockResetPasswordForEmail = vi.hoisted(() => vi.fn());
const mockGetClaims = vi.hoisted(() => vi.fn());
const mockUpdateUser = vi.hoisted(() => vi.fn());
const mockSignOut = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/headers", () => ({
  headers: mockHeaders,
}));

vi.mock("@lib/supabase/server", () => ({
  createClient: () =>
    Promise.resolve({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signUp: mockSignUp,
        signInWithOAuth: mockSignInWithOAuth,
        resetPasswordForEmail: mockResetPasswordForEmail,
        getClaims: mockGetClaims,
        updateUser: mockUpdateUser,
        signOut: mockSignOut,
      },
    }),
}));

import {
  signInWithEmail,
  signUpWithEmail,
  startGoogleSignIn,
  requestPasswordRecovery,
  updatePassword,
  signOut,
} from "../actions";

const mockHeadersValue = {
  get: (key: string) => {
    if (key === "host") return "localhost:3000";
    if (key === "x-forwarded-proto") return "http";
    return null;
  },
};

const validSignInValues = {
  email: "user@example.com",
  password: "password123",
  passwordConfirmation: "",
};

const validSignUpValues = {
  email: "user@example.com",
  password: "password123",
  passwordConfirmation: "password123",
};

describe("signInWithEmail", () => {
  beforeEach(() => {
    mockSignInWithPassword.mockResolvedValue({ error: null });
    mockGetClaims.mockResolvedValue({ data: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna erro de validação para e-mail inválido", async () => {
    const result = await signInWithEmail({
      email: "invalidemail",
      password: "password123",
      passwordConfirmation: "",
    });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
    expect(mockSignInWithPassword).not.toHaveBeenCalled();
  });

  it("retorna erro de validação para senha vazia", async () => {
    const result = await signInWithEmail({
      email: "user@example.com",
      password: "",
      passwordConfirmation: "",
    });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
  });

  it("retorna erro quando signInWithPassword falha", async () => {
    mockSignInWithPassword.mockResolvedValue({
      error: { code: "invalid_credentials" },
    });
    const result = await signInWithEmail(validSignInValues);
    expect(result).toEqual({
      status: "error",
      message: "E-mail ou senha incorretos.",
    });
  });

  it("redireciona para /dashboard em caso de sucesso sem next", async () => {
    await signInWithEmail(validSignInValues);
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("redireciona para next seguro em caso de sucesso", async () => {
    await signInWithEmail(validSignInValues, "/profile");
    expect(mockRedirect).toHaveBeenCalledWith("/profile");
  });

  it("ignora next inseguro e redireciona para /dashboard", async () => {
    await signInWithEmail(validSignInValues, "https://evil.com");
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("redireciona para /super-admin quando role é SUPER_ADMIN", async () => {
    mockGetClaims.mockResolvedValue({ data: { claims: { app_metadata: { role: "SUPER_ADMIN" } } } });
    await signInWithEmail(validSignInValues);
    expect(mockRedirect).toHaveBeenCalledWith("/super-admin");
  });
});

describe("signUpWithEmail", () => {
  beforeEach(() => {
    mockHeaders.mockResolvedValue(mockHeadersValue);
    mockSignUp.mockResolvedValue({ data: { session: null }, error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna erro de validação para senha fraca", async () => {
    const result = await signUpWithEmail({
      email: "user@example.com",
      password: "short",
      passwordConfirmation: "short",
    });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it("retorna erro de validação quando senhas não coincidem", async () => {
    const result = await signUpWithEmail({
      email: "user@example.com",
      password: "password123",
      passwordConfirmation: "different123",
    });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
  });

  it("retorna erro quando signUp falha", async () => {
    mockSignUp.mockResolvedValue({
      data: { session: null },
      error: { code: "user_already_exists" },
    });
    const result = await signUpWithEmail(validSignUpValues);
    expect(result).toEqual({
      status: "error",
      message: "Já existe uma conta com este e-mail.",
    });
  });

  it("retorna sucesso quando conta criada sem sessão (e-mail não confirmado)", async () => {
    const result = await signUpWithEmail(validSignUpValues);
    expect(result).toEqual({
      status: "success",
      message: "Conta criada. Verifique seu e-mail para confirmar o cadastro.",
    });
  });

  it("redireciona quando cadastro resulta em sessão imediata", async () => {
    mockSignUp.mockResolvedValue({
      data: { session: { access_token: "token" } },
      error: null,
    });
    await signUpWithEmail(validSignUpValues, "/onboarding");
    expect(mockRedirect).toHaveBeenCalledWith("/onboarding");
  });

  it("chama signUp com emailRedirectTo contendo /api/auth/callback", async () => {
    await signUpWithEmail(validSignUpValues);
    expect(mockSignUp).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          emailRedirectTo: expect.stringContaining("/api/auth/callback"),
        }),
      }),
    );
  });
});

describe("startGoogleSignIn", () => {
  beforeEach(() => {
    mockHeaders.mockResolvedValue(mockHeadersValue);
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: "https://accounts.google.com/oauth" },
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna url de redirecionamento em caso de sucesso", async () => {
    const result = await startGoogleSignIn();
    expect(result).toEqual({
      status: "redirect",
      url: "https://accounts.google.com/oauth",
    });
  });

  it("retorna erro quando signInWithOAuth falha", async () => {
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: null },
      error: { code: "provider_disabled" },
    });
    const result = await startGoogleSignIn();
    expect(result).toEqual({
      status: "error",
      message: "O login com Google ainda não está habilitado.",
    });
  });

  it("retorna erro quando url está ausente e não há error", async () => {
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: null },
      error: null,
    });
    const result = await startGoogleSignIn();
    expect(result).toEqual({
      status: "error",
      message: "Não foi possível iniciar o login com Google.",
    });
  });

  it("chama signInWithOAuth com provider google e redirectTo correto", async () => {
    await startGoogleSignIn();
    expect(mockSignInWithOAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "google",
        options: expect.objectContaining({
          redirectTo: expect.stringContaining("/api/auth/callback"),
        }),
      }),
    );
  });
});

describe("requestPasswordRecovery", () => {
  beforeEach(() => {
    mockHeaders.mockResolvedValue(mockHeadersValue);
    mockResetPasswordForEmail.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna erro de validação para e-mail inválido", async () => {
    const result = await requestPasswordRecovery({ email: "bademail" });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
    expect(mockResetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("retorna erro de validação para e-mail vazio", async () => {
    const result = await requestPasswordRecovery({ email: "" });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
  });

  it("retorna erro quando resetPasswordForEmail falha", async () => {
    mockResetPasswordForEmail.mockResolvedValue({
      error: { code: "over_email_send_rate_limit" },
    });
    const result = await requestPasswordRecovery({ email: "user@example.com" });
    expect(result).toEqual({
      status: "error",
      message: "Muitos e-mails foram solicitados. Aguarde alguns minutos.",
    });
  });

  it("retorna sucesso e instrui verificar e-mail", async () => {
    const result = await requestPasswordRecovery({ email: "user@example.com" });
    expect(result).toEqual({
      status: "success",
      message:
        "Enviamos um link de recuperação. Verifique a caixa de entrada e o spam.",
    });
  });

  it("chama resetPasswordForEmail com o e-mail e redirectTo corretos", async () => {
    await requestPasswordRecovery({ email: "user@example.com" });
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith(
      "user@example.com",
      expect.objectContaining({
        redirectTo: expect.stringContaining("/api/auth/callback"),
      }),
    );
  });
});

describe("updatePassword", () => {
  beforeEach(() => {
    mockGetClaims.mockResolvedValue({
      data: { claims: { sub: "user-id" } },
      error: null,
    });
    mockUpdateUser.mockResolvedValue({ error: null });
    mockSignOut.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna erro de validação para senha fraca", async () => {
    const result = await updatePassword({
      password: "short",
      passwordConfirmation: "short",
    });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
    expect(mockGetClaims).not.toHaveBeenCalled();
  });

  it("retorna erro de validação quando senhas não coincidem", async () => {
    const result = await updatePassword({
      password: "newpassword",
      passwordConfirmation: "different",
    });
    expect(result).toEqual({
      status: "error",
      message: "Verifique os dados informados.",
    });
  });

  it("retorna erro quando sessão de recuperação expirou (data null)", async () => {
    mockGetClaims.mockResolvedValue({ data: null, error: null });
    const result = await updatePassword({
      password: "newpassword",
      passwordConfirmation: "newpassword",
    });
    expect(result).toEqual({
      status: "error",
      message: "Sua sessão de recuperação expirou. Solicite um novo link.",
    });
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("retorna erro quando getClaims retorna claimsError", async () => {
    mockGetClaims.mockResolvedValue({
      data: null,
      error: { message: "session error" },
    });
    const result = await updatePassword({
      password: "newpassword",
      passwordConfirmation: "newpassword",
    });
    expect(result).toEqual({
      status: "error",
      message: "Sua sessão de recuperação expirou. Solicite um novo link.",
    });
  });

  it("retorna erro quando updateUser falha", async () => {
    mockUpdateUser.mockResolvedValue({ error: { code: "weak_password" } });
    const result = await updatePassword({
      password: "newpassword",
      passwordConfirmation: "newpassword",
    });
    expect(result).toEqual({
      status: "error",
      message: "A senha informada não atende aos requisitos de segurança.",
    });
  });

  it("retorna erro descritivo quando signOut falha após atualizar senha", async () => {
    mockSignOut.mockResolvedValue({ error: { code: "unknown" } });
    const result = await updatePassword({
      password: "newpassword",
      passwordConfirmation: "newpassword",
    });
    expect(result).toEqual({
      status: "error",
      message: expect.stringContaining("Sua senha foi atualizada"),
    });
  });

  it("redireciona para /login?password_updated=1 em caso de sucesso", async () => {
    await updatePassword({
      password: "newpassword",
      passwordConfirmation: "newpassword",
    });
    expect(mockRedirect).toHaveBeenCalledWith("/login?password_updated=1");
  });
});

describe("signOut", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna erro quando signOut falha", async () => {
    mockSignOut.mockResolvedValue({ error: { code: "unknown" } });
    const result = await signOut();
    expect(result).toEqual({
      status: "error",
      message: "Não foi possível concluir a autenticação. Tente novamente.",
    });
  });

  it("redireciona para /login em caso de sucesso", async () => {
    mockSignOut.mockResolvedValue({ error: null });
    await signOut();
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });
});
