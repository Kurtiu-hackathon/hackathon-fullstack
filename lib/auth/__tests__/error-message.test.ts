import type { AuthError } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";

import { getAuthErrorMessage } from "../error-message";

function makeError(code: string | undefined): AuthError {
  return { code } as AuthError;
}

describe("getAuthErrorMessage", () => {
  it("retorna mensagem para invalid_credentials", () => {
    expect(getAuthErrorMessage(makeError("invalid_credentials"))).toBe(
      "E-mail ou senha incorretos.",
    );
  });

  it("retorna mensagem para email_not_confirmed", () => {
    expect(getAuthErrorMessage(makeError("email_not_confirmed"))).toBe(
      "Confirme seu e-mail antes de entrar.",
    );
  });

  it("retorna mensagem para user_already_exists", () => {
    expect(getAuthErrorMessage(makeError("user_already_exists"))).toBe(
      "Já existe uma conta com este e-mail.",
    );
  });

  it("retorna mensagem para email_exists", () => {
    expect(getAuthErrorMessage(makeError("email_exists"))).toBe(
      "Já existe uma conta com este e-mail.",
    );
  });

  it("retorna mensagem para weak_password", () => {
    expect(getAuthErrorMessage(makeError("weak_password"))).toBe(
      "A senha informada não atende aos requisitos de segurança.",
    );
  });

  it("retorna mensagem para over_email_send_rate_limit", () => {
    expect(getAuthErrorMessage(makeError("over_email_send_rate_limit"))).toBe(
      "Muitos e-mails foram solicitados. Aguarde alguns minutos.",
    );
  });

  it("retorna mensagem para provider_disabled", () => {
    expect(getAuthErrorMessage(makeError("provider_disabled"))).toBe(
      "O login com Google ainda não está habilitado.",
    );
  });

  it("retorna fallback para código desconhecido", () => {
    expect(getAuthErrorMessage(makeError("unknown_code_xyz"))).toBe(
      "Não foi possível concluir a autenticação. Tente novamente.",
    );
  });

  it("retorna fallback quando code é undefined", () => {
    expect(getAuthErrorMessage(makeError(undefined))).toBe(
      "Não foi possível concluir a autenticação. Tente novamente.",
    );
  });
});
