import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=signout_failed", request.url),
      { status: 303 },
    );
  }

  return NextResponse.redirect(new URL("/login", request.url), {
    status: 303,
  });
}
