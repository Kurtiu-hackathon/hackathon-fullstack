import Link from "next/link";

import { AuthForm } from "./auth-form";
import { authTextLinkClassName } from "./auth-form-styles";
import { BackButton } from "./back-button";
import { PasswordRecoveryForm } from "./password-recovery-form";
import { communityLinks } from "../_data/community-links";
import { BrandMark } from "@/components/common/brand-mark";
import type { AuthMode } from "@/lib/auth/mode";

type LoginFormPanelProps = {
  content: {
    description: string;
    eyebrow: string;
    title: string;
  };
  initialError?: string;
  mode: AuthMode;
  next?: string;
  passwordUpdated: boolean;
};

export function LoginFormPanel({
  content,
  initialError,
  mode,
  next,
  passwordUpdated,
}: LoginFormPanelProps) {
  const isSignUp = mode === "signup";
  const isPasswordRecovery = mode === "forgot" || mode === "update";
  const alternateHref = {
    pathname: "/login",
    query: {
      mode: isSignUp ? "signin" : "signup",
      ...(next ? { next } : {}),
    },
  };

  return (
    <section className="flex min-h-svh flex-col bg-background">
      <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border px-5 lg:hidden">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 text-foreground no-underline"
          aria-label="SouJunior — início"
        >
          <BrandMark />
          <span className="text-xl font-medium tracking-tight">SouJunior</span>
        </Link>
        <BackButton className="tracking-[0.14em] text-[var(--accent-700)] hover:bg-transparent hover:text-[var(--accent-800)]" />
      </header>

      <div className="flex-1 px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:pt-40 lg:pb-10 xl:px-16">
        <div
          key={mode}
          className="mx-auto grid w-full max-w-[32.75rem] gap-8 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-3 motion-safe:duration-500"
        >
          <div className="grid gap-3">
            <h1 className="text-[2.65rem] leading-[0.98] font-semibold tracking-tight text-[#071226] sm:text-[2.8rem]">
              {content.title}
            </h1>
            <p className="text-[0.98rem] leading-7 text-[#416180]">
              {content.description}
            </p>
          </div>

          {isPasswordRecovery ? (
            <PasswordRecoveryForm mode={mode} initialError={initialError} />
          ) : (
            <AuthForm
              mode={mode}
              initialError={initialError}
              initialSuccess={
                passwordUpdated
                  ? "Senha atualizada com sucesso. Entre novamente."
                  : undefined
              }
              next={next}
            />
          )}

          <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            <span>
              {isPasswordRecovery
                ? "Lembrou sua senha?"
                : isSignUp
                  ? "Já tem uma conta?"
                  : "Ainda não tem conta?"}
            </span>
            <Link
              href={isPasswordRecovery ? "/login" : alternateHref}
              className={authTextLinkClassName}
            >
              {isPasswordRecovery
                ? "Voltar para o login"
                : isSignUp
                  ? "Entrar"
                  : "Criar conta de apoiador"}
            </Link>
          </p>

          <footer className="border-t border-border pt-5 pb-2">
            <nav
              aria-label="Links da SouJunior"
              className="flex flex-wrap gap-x-6 text-sm"
            >
              {communityLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={authTextLinkClassName}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </footer>
        </div>
      </div>
    </section>
  );
}
