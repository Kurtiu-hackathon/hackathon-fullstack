import type { Metadata } from "next";

import { LoginFormPanel } from "./_components/login-form-panel";
import { LoginVisualPanel } from "./_components/login-visual-panel";
import { authErrorMessages, pageContent } from "./_data/content";
import { getAuthMode } from "@lib/auth/mode";
import { getSafeRedirectPath } from "@lib/auth/safe-redirect";

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
