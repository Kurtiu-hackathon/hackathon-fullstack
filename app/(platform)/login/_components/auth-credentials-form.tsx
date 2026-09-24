"use client";

import Link from "next/link";
import { Controller, type SubmitHandler, type UseFormReturn } from "react-hook-form";

import {
  authInputClassName,
  authLabelClassName,
  authTextLinkClassName,
} from "./auth-form-styles";
import { AuthSubmitButton } from "./auth-submit-button";
import { PasswordInput } from "./password-input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CredentialsAuthMode } from "@/lib/auth/mode";
import type { AuthFormValues } from "@/lib/validations/auth";

type AuthCredentialsFormProps = {
  form: UseFormReturn<AuthFormValues>;
  isBusy: boolean;
  isSignUp: boolean;
  mode: CredentialsAuthMode;
  next?: string;
  onSubmit: SubmitHandler<AuthFormValues>;
};

export function AuthCredentialsForm({
  form,
  isBusy,
  isSignUp,
  mode,
  next,
  onSubmit,
}: AuthCredentialsFormProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`${mode}-email`}
                className={authLabelClassName}
              >
                E-mail
              </FieldLabel>
              <Input
                {...field}
                id={`${mode}-email`}
                type="email"
                placeholder="voce@email.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                disabled={isBusy}
                className={authInputClassName}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`${mode}-password`}
                className={authLabelClassName}
              >
                Senha
              </FieldLabel>
              <PasswordInput
                {...field}
                id={`${mode}-password`}
                placeholder="Digite sua senha"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  isSignUp ? `${mode}-password-description` : undefined
                }
                disabled={isBusy}
                className={authInputClassName}
              />
              {isSignUp && !fieldState.invalid && (
                <FieldDescription
                  id={`${mode}-password-description`}
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

        {!isSignUp && (
          <div className="flex min-h-11 items-center justify-end text-sm">
            <Link
              href={{
                pathname: "/login",
                query: { mode: "forgot", ...(next ? { next } : {}) },
              }}
              className={authTextLinkClassName}
            >
              Esqueci a senha
            </Link>
          </div>
        )}

        <AuthSubmitButton
          type="submit"
          isSubmitting={form.formState.isSubmitting}
          pendingLabel="Aguarde..."
          disabled={isBusy}
        >
          {isSignUp ? "Criar conta" : "Entrar"}
        </AuthSubmitButton>
      </FieldGroup>
    </form>
  );
}
