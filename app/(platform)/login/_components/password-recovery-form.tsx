<<<<<<<< HEAD:app/login/_components/password-recovery-form.tsx
import { ForgotPasswordForm } from "@/app/login/_components/forgot-password-form";
import { UpdatePasswordForm } from "@/app/login/_components/update-password-form";
import type { PasswordRecoveryMode } from "@/lib/auth/mode";
========
﻿import { ForgotPasswordForm } from "./forgot-password-form";
import { UpdatePasswordForm } from "./update-password-form";
import type { PasswordRecoveryMode } from "@lib/auth/mode";
>>>>>>>> development:app/(platform)/login/_components/password-recovery-form.tsx

type PasswordRecoveryFormProps = {
  mode: PasswordRecoveryMode;
  initialError?: string;
};

export function PasswordRecoveryForm({
  mode,
  initialError,
}: PasswordRecoveryFormProps) {
  return mode === "forgot" ? (
    <ForgotPasswordForm initialError={initialError} />
  ) : (
    <UpdatePasswordForm />
  );
}
