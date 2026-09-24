import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockRedirect = vi.hoisted(() => vi.fn());
const mockSignOut = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("@lib/supabase/server", () => ({
  createClient: () =>
    Promise.resolve({
      auth: { signOut: mockSignOut },
    }),
}));

import { signOutAction } from "../auth";

describe("signOutAction", () => {
  beforeEach(() => {
    mockSignOut.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("chama supabase.auth.signOut", async () => {
    await signOutAction();
    expect(mockSignOut).toHaveBeenCalledOnce();
  });

  it("redireciona para /login após sign out com sucesso", async () => {
    await signOutAction();
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("redireciona para /login mesmo quando signOut retorna erro", async () => {
    mockSignOut.mockResolvedValue({ error: { code: "unknown" } });
    await signOutAction();
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });
});
