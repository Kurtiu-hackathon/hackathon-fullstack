const redirectBaseUrl = "http://local.redirect";
const defaultRedirectPath = "/dashboard";

export function getSafeRedirectPath(value?: string | null) {
  if (!value?.startsWith("/")) {
    return defaultRedirectPath;
  }

  try {
    const url = new URL(value, redirectBaseUrl);

    if (url.origin !== redirectBaseUrl) {
      return defaultRedirectPath;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return defaultRedirectPath;
  }
}

export function buildAuthCallbackUrl(origin: string, next?: string | null) {
  const callbackUrl = new URL("/api/auth/callback", origin);
  callbackUrl.searchParams.set("next", getSafeRedirectPath(next));
  return callbackUrl.toString();
}
