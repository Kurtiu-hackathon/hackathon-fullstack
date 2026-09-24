import Image from "next/image";
import Link from "next/link";

import { AuthForm } from "@/app/login/_components/auth-form";
import { authTextLinkClassName } from "@/app/login/_components/auth-form-styles";
import { BackButton } from "@/app/login/_components/back-button";
import { PasswordRecoveryForm } from "@/app/login/_components/password-recovery-form";
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

const communityLinks = [
  {
    href: "https://discord.gg/soujunior-community-759176734460346423",
    label: "Discord",
  },
  { href: "https://github.com/SouJunior", label: "GitHub" },
  { href: "https://apoia.se/soujunior", label: "Apoia.se" },
];

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
          <Image
            src="/icos/icon-blue.svg"
            alt=""
            width={28}
            height={28}
            className="size-7"
          />
          <span className="text-xl font-medium tracking-tight">SouJunior</span>
        </Link>
        <BackButton className="tracking-[0.14em] text-[var(--accent-700)] hover:bg-transparent hover:text-[var(--accent-800)]" />
      </header>

      <div className="flex-1 px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:pt-[250px] lg:pb-10 xl:px-16">
        <div
          key={mode}
          className="mx-auto grid w-full max-w-[36rem] gap-9 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-3 motion-safe:duration-500"
        >
          <div className="grid gap-3">
            <h1 className="text-[2.9rem] leading-[0.98] font-semibold tracking-tight text-[#071226] sm:text-[3.1rem]">
              {content.title}
            </h1>
            <p className="text-[1.05rem] leading-7 text-[#416180]">
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
