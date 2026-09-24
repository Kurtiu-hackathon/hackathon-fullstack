"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { getAuthErrorMessage } from "@/lib/auth/error-message";
import type { CredentialsAuthMode } from "@/lib/auth/mode";
import {
  buildAuthCallbackUrl,
  getSafeRedirectPath,
} from "@/lib/auth/safe-redirect";
import { createClient } from "@/lib/supabase/client";
import {
  signInSchema,
  signUpSchema,
  type AuthFormValues,
} from "@/lib/validations/auth";
import { signInAction, signUpAction } from "@/app/login/_lib/server/actions";

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
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function submitCredentials(values: AuthFormValues) {
    setFormError(null);
    setSuccessMessage(null);

    if (isSignUp) {
      const result = await signUpAction(values.email, values.password, safeNext);
      if ("error" in result) {
        setFormError(result.error);
        return;
      }
      setSuccessMessage(result.success);
      form.reset();
    } else {
      const error = await signInAction(values.email, values.password, safeNext);
      if (error) setFormError(error);
    }
  }

  async function signInWithGoogle() {
    setFormError(null);
    setSuccessMessage(null);
    setIsGoogleLoading(true);

    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: buildAuthCallbackUrl(window.location.origin, safeNext),
      },
    });

    if (error) {
      setFormError(getAuthErrorMessage(error));
      setIsGoogleLoading(false);
    }
  }

  return {
    form,
    formError,
    isBusy: form.formState.isSubmitting || isGoogleLoading,
    isGoogleLoading,
    isSignUp,
    signInWithGoogle,
    submitCredentials,
    successMessage,
  };
}
