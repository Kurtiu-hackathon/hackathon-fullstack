"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { User } from "@supabase/supabase-js";

import { createClient } from "@lib/supabase/client";

type UserContextValue = {
  user: User | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  isLoading: true,
});

type UserProviderProps = {
  initialUser: User | null;
  children: React.ReactNode;
};

export function UserProvider({ initialUser, children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
