import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import createClient from "./supabase/client";
import { redirect } from "next/navigation";

interface UserState {
  user: User | null;
  loading?: boolean;
  loginWithGoogle: (redirectTo?: string) => Promise<void>;
  checkSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const authStore = create<UserState>((set) => ({
  user: null,
  loading: false,

  // redirectTo: incase user try to access a protected page and user is not logged in, the page url is gotten and user redirected to login. then when user logs in, they are redirected to the previous page
  loginWithGoogle: async (redirectTo = "/") => {
    set({ loading: true });
    const supabase = createClient();

    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(
          redirectTo
        )}`,
      },
    });

    if (error) {
      console.error("Google OAuth error:", error.message);
      set({ loading: false });
      return;
    }

    set({ loading: false });
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
    redirect("/login");
  },

  checkSession: async () => {
    set({ loading: true });
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    set({ user: session?.user || null, loading: false });
  },
}));
