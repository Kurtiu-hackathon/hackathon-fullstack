import { expect, test } from "@playwright/test";

test.describe("Proteção de rota autenticada", () => {
  test("redireciona /dashboard para /login quando não autenticado", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
    const url = new URL(page.url());
    expect(url.searchParams.get("next")).toBe("/dashboard");
  });
});

test.describe("Página de login — modo signin (padrão)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("exibe campo de e-mail", async ({ page }) => {
    await expect(page.locator("#signin-email")).toBeVisible();
  });

  test("exibe campo de senha", async ({ page }) => {
    await expect(page.locator("#signin-password")).toBeVisible();
  });

  test("exibe botão Entrar", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /entrar/i }),
    ).toBeVisible();
  });

  test("exibe link Esqueci a senha", async ({ page }) => {
    await expect(page.getByText(/esqueci a senha/i)).toBeVisible();
  });

  test("não exibe campo de confirmação de senha", async ({ page }) => {
    await expect(page.locator("#signin-password-confirmation")).not.toBeVisible();
  });
});

test.describe("Página de login — modo signup (?mode=signup)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login?mode=signup");
  });

  test("exibe campo de confirmação de senha", async ({ page }) => {
    await expect(page.locator("#signup-password-confirmation")).toBeVisible();
  });

  test("exibe botão Criar conta", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /criar conta/i }),
    ).toBeVisible();
  });

  test("não exibe link Esqueci a senha", async ({ page }) => {
    await expect(page.getByText(/esqueci a senha/i)).not.toBeVisible();
  });
});

test.describe("Validação client-side — formulário de sign-in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("exibe erro de e-mail ao submeter formulário vazio", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /entrar/i }).click();
    await expect(page.getByText(/informe seu e-mail/i)).toBeVisible();
  });

  test("exibe erro de senha ao submeter com e-mail preenchido e senha vazia", async ({
    page,
  }) => {
    await page.locator("#signin-email").fill("test@example.com");
    await page.getByRole("button", { name: /entrar/i }).click();
    await expect(page.getByText(/informe sua senha/i)).toBeVisible();
  });

  test("exibe erro para formato de e-mail inválido", async ({ page }) => {
    await page.locator("#signin-email").fill("not-an-email");
    await page.locator("#signin-password").fill("somepassword");
    await page.getByRole("button", { name: /entrar/i }).click();
    await expect(page.getByText(/e-mail válido/i)).toBeVisible();
  });
});

test.describe("Validação client-side — formulário de sign-up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login?mode=signup");
  });

  test("exibe erro de senha curta (< 8 caracteres)", async ({ page }) => {
    await page.locator("#signup-email").fill("test@example.com");
    await page.locator("#signup-password").fill("short");
    await page.locator("#signup-password-confirmation").fill("short");
    await page.getByRole("button", { name: /criar conta/i }).click();
    await expect(page.getByText(/8 caracteres/i)).toBeVisible();
  });

  test("exibe erro quando senhas não coincidem", async ({ page }) => {
    await page.locator("#signup-email").fill("test@example.com");
    await page.locator("#signup-password").fill("strongpass1");
    await page.locator("#signup-password-confirmation").fill("strongpass2");
    await page.getByRole("button", { name: /criar conta/i }).click();
    await expect(page.getByText(/senhas não coincidem/i)).toBeVisible();
  });
});

test.describe("Página de login — modo forgot (?mode=forgot)", () => {
  test("renderiza formulário de recuperação de senha", async ({ page }) => {
    await page.goto("/login?mode=forgot");
    await expect(page.locator("input[type='email']")).toBeVisible();
  });
});

test.describe("Parâmetros de erro via URL", () => {
  test("exibe mensagem de erro para credenciais inválidas", async ({
    page,
  }) => {
    await page.goto("/login?error=invalid_credentials");
    await expect(page.getByText(/senha incorretos/i)).toBeVisible();
  });
});
