"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  signInWithEmail,
  signUpWithEmail,
  startGoogleSignIn,
  type AuthActionResult,
} from "@/app/(platform)/login/_lib/server/actions";
import type { CredentialsAuthMode } from "@lib/auth/mode";
import { getSafeRedirectPath } from "@lib/auth/safe-redirect";
import {
  signInSchema,
  signUpSchema,
  type AuthFormValues,
} from "@lib/validations/auth";

type UseAuthenticationOptions = {
  initialError?: string;
  initialSuccess?: string;
  mode: CredentialsAuthMode;
  next?: string;
};

export function useAuthentication({
  initialError,
  initialSuccess,
  mode,
  next,
}: UseAuthenticationOptions) {
  const isSignUp = mode === "signup";
  const safeNext = getSafeRedirectPath(next);
  const [formError, setFormError] = useState<string | null>(
    initialError ?? null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(
    initialSuccess ?? null,
  );
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: { email: "", password: "", passwordConfirmation: "" },
  });

  async function submitCredentials(values: AuthFormValues) {
    setFormError(null);
    setSuccessMessage(null);

    const result = await new Promise<AuthActionResult>((resolve) => {
      startTransition(async () => {
        resolve(
          isSignUp
            ? await signUpWithEmail(values, safeNext)
            : await signInWithEmail(values, safeNext),
        );
      });
    });

    if (result.status === "error") {
      setFormError(result.message);
      return;
    }

    setSuccessMessage(result.message);
    form.reset();
  }

  async function signInWithGoogle() {
    setFormError(null);
    setSuccessMessage(null);
    setIsGoogleLoading(true);

    startTransition(async () => {
      const result = await startGoogleSignIn(safeNext);

      if (result.status === "error") {
        setFormError(result.message);
        setIsGoogleLoading(false);
        return;
      }

      window.location.assign(result.url);
    });
  }

  return {
    form,
    formError,
    isBusy: form.formState.isSubmitting || isGoogleLoading || isPending,
    isGoogleLoading,
    isSignUp,
    signInWithGoogle,
    submitCredentials,
    successMessage,
  };
}
