"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getAuthErrorMessage } from "@/lib/auth/error-message";
import { buildAuthCallbackUrl, getSafeRedirectPath } from "@/lib/auth/safe-redirect";
import { createClient } from "@/lib/supabase/server";

export async function signInAction(
  email: string,
  password: string,
  next?: string,
): Promise<string | undefined> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return getAuthErrorMessage(error);
  redirect(getSafeRedirectPath(next));
}

export async function signUpAction(
  email: string,
  password: string,
  next?: string,
): Promise<{ error: string } | { success: string }> {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "";
  const safeNext = getSafeRedirectPath(next);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: buildAuthCallbackUrl(origin, safeNext),
    },
  });

  if (error) return { error: getAuthErrorMessage(error) };

  if (!data.session) {
    return { success: "Conta criada. Verifique seu e-mail para confirmar o cadastro." };
  }

  redirect(safeNext);
}

export async function forgotPasswordAction(
  email: string,
): Promise<{ error: string } | { success: string }> {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: buildAuthCallbackUrl(origin, "/login?mode=update"),
  });

  if (error) return { error: getAuthErrorMessage(error) };

  return { success: "Enviamos um link de recuperação. Verifique a caixa de entrada e o spam." };
}

export async function updatePasswordAction(
  password: string,
): Promise<string | undefined> {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) return getAuthErrorMessage(error);

  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    return "Sua senha foi atualizada, mas não foi possível encerrar a sessão. Saia da conta antes de entrar novamente.";
  }

  redirect("/login?password_updated=1");
}
