import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { getSafeRedirectPath } from "@lib/auth/safe-redirect";
import { createClient } from "@lib/supabase/server";

function getEmailOtpType(value: string | null): EmailOtpType | null {
  return value === "email" || value === "recovery" ? value : null;
}

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = getEmailOtpType(request.nextUrl.searchParams.get("type"));
  const safeNext = getSafeRedirectPath(
    request.nextUrl.searchParams.get("next"),
  );

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });

    if (!error) {
      return NextResponse.redirect(new URL(safeNext, request.url));
    }
  }

  if (type === "recovery") {
    return NextResponse.redirect(
      new URL(
        "/login?mode=forgot&error=recovery_link_invalid",
        request.url,
      ),
    );
  }

  return NextResponse.redirect(
    new URL("/login?error=email_confirmation", request.url),
  );
}
