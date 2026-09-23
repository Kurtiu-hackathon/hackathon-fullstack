"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { requestPasswordRecovery } from "@/app/login/_actions/authentication";
import {
  authInputClassName,
  authLabelClassName,
} from "@/components/auth/auth-form-styles";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { FeedbackMessage } from "@/components/auth/feedback-message";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validations/auth";

type ForgotPasswordFormProps = {
  initialError?: string;
};

export function ForgotPasswordForm({
  initialError,
}: ForgotPasswordFormProps) {
  const [formError, setFormError] = useState<string | null>(
    initialError ?? null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: ForgotPasswordValues) {
    setFormError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const result = await requestPasswordRecovery(values);

      if (result.status === "error") {
        setFormError(result.message);
        return;
      }

      setSuccessMessage(result.message);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="recovery-email"
                className={authLabelClassName}
              >
                E-mail
              </FieldLabel>
              <Input
                {...field}
                id="recovery-email"
                type="email"
                placeholder="voce@email.com"
                autoComplete="email"
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
        {successMessage && (
          <FeedbackMessage role="status" variant="success">
            {successMessage}
          </FeedbackMessage>
        )}

        <AuthSubmitButton
          type="submit"
          isSubmitting={isPending}
          pendingLabel="Enviando..."
        >
          Enviar link
        </AuthSubmitButton>
      </FieldGroup>
    </form>
  );
}
