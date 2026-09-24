"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  authInputClassName,
  authLabelClassName,
} from "./auth-form-styles";
import { AuthSubmitButton } from "./auth-submit-button";
import { FeedbackMessage } from "./feedback-message";
import { PasswordInput } from "./password-input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { updatePasswordAction } from "@/app/(platform)/login/_lib/server/actions";
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from "@/lib/validations/auth";

export function UpdatePasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit(values: UpdatePasswordValues) {
    setFormError(null);

    const error = await updatePasswordAction(values.password);
    if (error) setFormError(error);
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
