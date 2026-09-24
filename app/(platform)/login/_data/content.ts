import type { AuthMode } from "@/lib/auth/mode";

export const authErrorMessages: Record<string, string> = {
  email_confirmation:
    "Não foi possível confirmar o e-mail. Solicite um novo link e tente novamente.",
  oauth_callback:
    "Não foi possível concluir o login com Google. Tente novamente.",
  recovery_link_invalid:
    "Este link de recuperação é inválido, expirou ou já foi usado. Solicite um novo link.",
};

export const pageContent: Record<
  AuthMode,
  { description: string; eyebrow: string; title: string }
> = {
  signin: {
    eyebrow: "Login",
    title: "Bem-vindo de volta",
    description: "Acesse com o Google ou com seu e-mail e senha.",
  },
  signup: {
    eyebrow: "Cadastro",
    title: "Crie sua conta",
    description: "Cadastre-se com o Google ou usando seu e-mail e senha.",
  },
  forgot: {
    eyebrow: "Recuperação",
    title: "Recupere seu acesso",
    description: "Informe seu e-mail para receber o link de recuperação.",
  },
  update: {
    eyebrow: "Nova senha",
    title: "Defina uma nova senha",
    description: "Escolha uma senha segura para voltar à sua conta.",
  },
};
