"use client";

import { LoaderCircle } from "lucide-react";

import { AuthCredentialsForm } from "@/components/auth/auth-credentials-form";
import { FeedbackMessage } from "@/components/auth/feedback-message";
import { useAuthentication } from "@/components/auth/use-authentication";
import { Blueprint } from "@/components/ui/blueprint";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import type { CredentialsAuthMode } from "@/lib/auth/mode";

type AuthFormProps = {
  mode: CredentialsAuthMode;
  initialError?: string;
  initialSuccess?: string;
  next?: string;
};

export function AuthForm({
  mode,
  initialError,
  initialSuccess,
  next,
}: AuthFormProps) {
  const authentication = useAuthentication({
    initialError,
    initialSuccess,
    mode,
    next,
  });

  return (
    <div className="grid gap-7">
      <Blueprint>
        <Button
          className="h-16 w-full text-[1rem] font-semibold text-[#071226] hover:bg-[#e9eef7]"
          type="button"
          variant="ghost"
          onClick={authentication.signInWithGoogle}
          disabled={authentication.isBusy}
        >
          {authentication.isGoogleLoading ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                data-icon="inline-start"
                className="animate-spin"
                strokeWidth={1.5}
              />
              Redirecionando...
            </>
          ) : (
            <>
              <span
                aria-hidden="true"
                className="flex size-7 items-center justify-center bg-[conic-gradient(from_180deg,#4285f4,#34a853,#fbbc05,#ea4335,#4285f4)] bg-clip-text font-sans text-xl font-bold text-transparent transition-transform duration-200 motion-safe:group-hover/button:scale-105 motion-reduce:transition-none"
              >
                G
              </span>
              Continuar com o Google
            </>
          )}
        </Button>
      </Blueprint>

      <FieldSeparator className="my-0 font-mono text-[0.66rem] tracking-[0.28em] text-[#416180] uppercase">
        ou com e-mail
      </FieldSeparator>

      {authentication.formError && (
        <FeedbackMessage
          role="alert"
          aria-live="assertive"
          className="font-medium motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200"
        >
          {authentication.formError}
        </FeedbackMessage>
      )}

      {authentication.successMessage && (
        <FeedbackMessage
          role="status"
          aria-live="polite"
          variant="success"
          className="font-medium motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200"
        >
          {authentication.successMessage}
        </FeedbackMessage>
      )}

      <AuthCredentialsForm
        form={authentication.form}
        isBusy={authentication.isBusy}
        isSignUp={authentication.isSignUp}
        mode={mode}
        next={next}
        onSubmit={authentication.submitCredentials}
      />
    </div>
  );
}
