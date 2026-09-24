"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  authInputClassName,
  authLabelClassName,
} from "@/components/auth/auth-form-styles";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { FeedbackMessage } from "@/components/auth/feedback-message";
import { PasswordInput } from "@/components/auth/password-input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { getAuthErrorMessage } from "@/lib/auth/error-message";
import { createClient } from "@/lib/supabase/client";
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from "@/lib/validations/auth";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit(values: UpdatePasswordValues) {
    setFormError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      setFormError(getAuthErrorMessage(error));
      return;
    }

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setFormError(
        "Sua senha foi atualizada, mas não foi possível encerrar a sessão. Saia da conta antes de entrar novamente.",
      );
      return;
    }

    router.replace("/login?password_updated=1");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="new-password"
                className={authLabelClassName}
              >
                Nova senha
              </FieldLabel>
              <PasswordInput
                {...field}
                id="new-password"
                placeholder="Digite a nova senha"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                aria-describedby="new-password-description"
                disabled={form.formState.isSubmitting}
                className={authInputClassName}
              />
              {!fieldState.invalid && (
                <FieldDescription
                  id="new-password-description"
                  className="text-xs"
                >
                  Use pelo menos 8 caracteres.
                </FieldDescription>
              )}
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {formError && <FeedbackMessage role="alert">{formError}</FeedbackMessage>}

        <AuthSubmitButton
          type="submit"
          isSubmitting={form.formState.isSubmitting}
          pendingLabel="Salvando..."
        >
          Salvar nova senha
        </AuthSubmitButton>
      </FieldGroup>
    </form>
  );
}
