import type { Metadata } from "next";

import { LoginFormPanel } from "@/app/login/_components/login-form-panel";
import { LoginVisualPanel } from "@/app/login/_components/login-visual-panel";
import { getAuthMode, type AuthMode } from "@/lib/auth/mode";
import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    mode?: string | string[];
    next?: string | string[];
    password_updated?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Acesso",
};

const authErrorMessages: Record<string, string> = {
  email_confirmation:
    "Não foi possível confirmar o e-mail. Solicite um novo link e tente novamente.",
  oauth_callback:
    "Não foi possível concluir o login com Google. Tente novamente.",
  recovery_link_invalid:
    "Este link de recuperação é inválido, expirou ou já foi usado. Solicite um novo link.",
};

const pageContent: Record<
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

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = firstParam(params.error);
  const requestedNext = firstParam(params.next);
  const mode = getAuthMode(firstParam(params.mode));
  const next = requestedNext ? getSafeRedirectPath(requestedNext) : undefined;

  return (
    <main className="grid min-h-svh items-start bg-background lg:grid-cols-2">
      <LoginVisualPanel />
      <LoginFormPanel
        content={pageContent[mode]}
        initialError={error ? authErrorMessages[error] : undefined}
        mode={mode}
        next={next}
        passwordUpdated={firstParam(params.password_updated) === "1"}
      />
    </main>
  );
}
