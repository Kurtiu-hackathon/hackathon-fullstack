"use client";

import { LoaderCircle } from "lucide-react";

import { AuthCredentialsForm } from "./auth-credentials-form";
import { FeedbackMessage } from "./feedback-message";
import { useAuthentication } from "./use-authentication";
import { Blueprint } from "@components/ui/blueprint";
import { Button } from "@components/ui/button";
import { FieldSeparator } from "@components/ui/field";
import type { CredentialsAuthMode } from "@lib/auth/mode";

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
          className="h-[4.5rem] w-full text-[1.1rem] font-semibold text-[#071226] hover:bg-[#e9eef7]"
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
              <svg
                aria-hidden="true"
                viewBox="0 0 18 18"
                className="size-5 transition-transform duration-200 motion-safe:group-hover/button:scale-105 motion-reduce:transition-none"
              >
                <path
                  fill="#4285F4"
                  d="M17.64 9.2045c0-.638-.0573-1.2523-.1636-1.8409H9v3.4818h4.8436c-.2086 1.125-.8427 2.0782-1.796 2.7164v2.2582h2.908c1.702-1.5673 2.684-3.874 2.684-6.6155Z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.4673-.8055 5.956-2.18l-2.908-2.2582c-.8055.54-1.8355.8591-3.048.8591-2.3441 0-4.3286-1.5845-5.0364-3.7105H.9573v2.332C2.4382 15.9842 5.4818 18 9 18Z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.9636 10.7104A5.4101 5.4101 0 0 1 3.6818 9c0-.5932.1023-1.17.2818-1.7105V4.9577H.9573A9 9 0 0 0 0 9c0 1.4523.3477 2.8277.9573 4.0427l3.0063-2.3323Z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.5795c1.3214 0 2.5077.454 3.4418 1.3454l2.5818-2.5818C13.4632.8918 11.4268 0 9 0 5.4818 0 2.4382 2.0159.9573 4.9577l3.0063 2.3318C4.6714 5.1641 6.6559 3.5795 9 3.5795Z"
                />
              </svg>
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
