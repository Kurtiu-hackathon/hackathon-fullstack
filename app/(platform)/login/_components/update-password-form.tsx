"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { updatePassword } from "@/app/(platform)/login/_lib/server/actions";
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
} from "@components/ui/field";
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from "@lib/validations/auth";

export function UpdatePasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "", passwordConfirmation: "" },
  });

  function onSubmit(values: UpdatePasswordValues) {
    setFormError(null);

    startTransition(async () => {
      const result = await updatePassword(values);

      if (result.status === "error") {
        setFormError(result.message);
      }
    });
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
                disabled={isPending}
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

        <Controller
          name="passwordConfirmation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="new-password-confirmation"
                className={authLabelClassName}
              >
                Confirmar nova senha
              </FieldLabel>
              <PasswordInput
                {...field}
                id="new-password-confirmation"
                placeholder="Digite a nova senha novamente"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
                className={authInputClassName}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {formError && <FeedbackMessage role="alert">{formError}</FeedbackMessage>}

        <AuthSubmitButton
          type="submit"
          isSubmitting={isPending}
          pendingLabel="Salvando..."
        >
          Salvar nova senha
        </AuthSubmitButton>
      </FieldGroup>
    </form>
  );
}
