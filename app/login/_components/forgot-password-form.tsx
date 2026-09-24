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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPasswordAction } from "@/app/login/_lib/server/actions";
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
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setFormError(null);
    setSuccessMessage(null);

    const result = await forgotPasswordAction(values.email);

    if ("error" in result) {
      setFormError(result.error);
      return;
    }

    setSuccessMessage(result.success);
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
                disabled={form.formState.isSubmitting}
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
          isSubmitting={form.formState.isSubmitting}
          pendingLabel="Enviando..."
        >
          Enviar link
        </AuthSubmitButton>
      </FieldGroup>
    </form>
  );
}
