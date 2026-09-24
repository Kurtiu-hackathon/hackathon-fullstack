import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import type { PasswordRecoveryMode } from "@/lib/auth/mode";

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
