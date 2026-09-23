export type AuthMode = "signin" | "signup" | "forgot" | "update";

export type CredentialsAuthMode = Extract<AuthMode, "signin" | "signup">;

export type PasswordRecoveryMode = Extract<AuthMode, "forgot" | "update">;

export function getAuthMode(value?: string): AuthMode {
  switch (value) {
    case "signup":
    case "forgot":
    case "update":
      return value;
    default:
      return "signin";
  }
}
