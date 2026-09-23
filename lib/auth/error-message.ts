import type { AuthError } from "@supabase/supabase-js";

const authErrorMessages: Record<string, string> = {
  invalid_credentials: "E-mail ou senha incorretos.",
  email_not_confirmed: "Confirme seu e-mail antes de entrar.",
  user_already_exists: "Já existe uma conta com este e-mail.",
  email_exists: "Já existe uma conta com este e-mail.",
  weak_password: "A senha informada não atende aos requisitos de segurança.",
  email_address_invalid: "O endereço de e-mail informado não é válido.",
  email_address_not_authorized:
    "Este e-mail não está autorizado pelo serviço de envio.",
  over_email_send_rate_limit:
    "Muitos e-mails foram solicitados. Aguarde alguns minutos.",
  email_provider_disabled: "O cadastro por e-mail está desabilitado.",
  validation_failed: "Verifique os dados informados.",
  provider_disabled: "O login com Google ainda não está habilitado.",
};

export function getAuthErrorMessage(error: AuthError) {
  if (error.code && authErrorMessages[error.code]) {
    return authErrorMessages[error.code];
  }

  return "Não foi possível concluir a autenticação. Tente novamente.";
}