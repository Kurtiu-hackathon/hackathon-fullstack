"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getDashboardByRole } from "@lib/auth/dashboard-route";
import { getAuthErrorMessage } from "@lib/auth/error-message";
import { getSafeRedirectPath, buildAuthCallbackUrl } from "@lib/auth/safe-redirect";
import { createClient } from "@lib/supabase/server";
import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
  updatePasswordSchema,
  type AuthFormValues,
  type ForgotPasswordValues,
  type UpdatePasswordValues,
} from "@lib/validations/auth";

type AuthActionError = {
  status: "error";
  message: string;
};

type AuthActionSuccess = {
  status: "success";
  message: string;
};

export type AuthActionResult = AuthActionError | AuthActionSuccess;

export type GoogleSignInActionResult =
  | AuthActionError
  | {
      status: "redirect";
      url: string;
    };

function getValidationError() {
  return {
    status: "error" as const,
    message: "Verifique os dados informados.",
  };
}

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (!host) {
    throw new Error("Não foi possível determinar a URL da aplicação.");
  }

  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

export async function signInWithEmail(
  values: AuthFormValues,
  next?: string,
): Promise<AuthActionResult> {
  const parsedValues = signInSchema.safeParse(values);

  if (!parsedValues.success) {
    return getValidationError();
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsedValues.data.email,
    password: parsedValues.data.password,
  });

  if (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  const safeNext = getSafeRedirectPath(next);

  if (safeNext !== "/dashboard") {
    redirect(safeNext);
  }

  const { data: claimsData } = await supabase.auth.getClaims();
  const role = claimsData?.claims?.app_metadata?.role as string | undefined;
  redirect(getDashboardByRole(role));
}

export async function signUpWithEmail(
  values: AuthFormValues,
  next?: string,
): Promise<AuthActionResult> {
  const parsedValues = signUpSchema.safeParse(values);

  if (!parsedValues.success) {
    return getValidationError();
  }

  const safeNext = getSafeRedirectPath(next);
  const origin = await getRequestOrigin();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsedValues.data.email,
    password: parsedValues.data.password,
    options: {
      emailRedirectTo: buildAuthCallbackUrl(origin, safeNext),
    },
  });

  if (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  if (!data.session) {
    return {
      status: "success",
      message: "Conta criada. Verifique seu e-mail para confirmar o cadastro.",
    };
  }

  redirect(safeNext);
}

export async function startGoogleSignIn(
  next?: string,
): Promise<GoogleSignInActionResult> {
  const origin = await getRequestOrigin();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: buildAuthCallbackUrl(origin, next),
    },
  });

  if (error || !data.url) {
    return {
      status: "error",
      message: error
        ? getAuthErrorMessage(error)
        : "Não foi possível iniciar o login com Google.",
    };
  }

  return { status: "redirect", url: data.url };
}

export async function requestPasswordRecovery(
  values: ForgotPasswordValues,
): Promise<AuthActionResult> {
  const parsedValues = forgotPasswordSchema.safeParse(values);

  if (!parsedValues.success) {
    return getValidationError();
  }

  const origin = await getRequestOrigin();
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsedValues.data.email,
    {
      redirectTo: buildAuthCallbackUrl(origin, "/login?mode=update"),
    },
  );

  if (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  return {
    status: "success",
    message: "Enviamos um link de recuperação. Verifique a caixa de entrada e o spam.",
  };
}

export async function updatePassword(
  values: UpdatePasswordValues,
): Promise<AuthActionResult> {
  const parsedValues = updatePasswordSchema.safeParse(values);

  if (!parsedValues.success) {
    return getValidationError();
  }

  const supabase = await createClient();
  const { data, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !data?.claims) {
    return {
      status: "error",
      message: "Sua sessão de recuperação expirou. Solicite um novo link.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsedValues.data.password,
  });

  if (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    return {
      status: "error",
      message:
        "Sua senha foi atualizada, mas não foi possível encerrar a sessão. Saia da conta antes de entrar novamente.",
    };
  }

  redirect("/login?password_updated=1");
}

export async function signOut(): Promise<AuthActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  redirect("/login");
}
