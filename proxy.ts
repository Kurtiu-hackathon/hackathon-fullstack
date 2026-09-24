import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getDashboardByRole } from "@lib/auth/dashboard-route";
import { getSafeRedirectPath } from "@lib/auth/safe-redirect";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          supabaseResponse = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );

          if (headers) {
            Object.entries(headers).forEach(([key, value]) =>
              supabaseResponse.headers.set(key, value),
            );
          }
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  const isLoginRoute = request.nextUrl.pathname === "/login";
  const mode = request.nextUrl.searchParams.get("mode");

  if (isLoginRoute && claims && mode !== "update") {
    const nextParam = request.nextUrl.searchParams.get("next");
    const safeNext = nextParam ? getSafeRedirectPath(nextParam) : null;
    const isValidNext = safeNext && !safeNext.startsWith("/login");

    const destination = isValidNext
      ? safeNext
      : getDashboardByRole(claims.app_metadata?.role as string | undefined);

    return NextResponse.redirect(new URL(destination, request.nextUrl.origin));
  }

  const isProtectedRoute =
    request.nextUrl.pathname === "/dashboard" ||
    request.nextUrl.pathname.startsWith("/dashboard/");

  if (isProtectedRoute && !claims) {
    const requestedPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", requestedPath);

    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
