import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import createClient from "./supabase/client";
import { redirect } from "next/navigation";
import sodium from "libsodium-wrappers";

type searchUser =
  | {
      avatar_url: string | null;
      bio: string | null;
      created_at: string | null;
      id: string;
      name: string;
    }[]
  | null;

type UserKey = {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
};

interface StoreState {
  user: User | null;
  loading?: boolean;
  keys: UserKey | null;
  loginWithGoogle: (redirectTo?: string) => Promise<void>;
  checkSession: () => Promise<void>;
  signOut: () => Promise<void>;
  searchUser: (query: string) => Promise<searchUser>;
  sendMessage: () => Promise<void>;
  fetchKeys: () => Promise<void>;
}

export const store = create<StoreState>((set, get) => ({
  user: null,
  loading: false,
  keys: null,

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
    console.log("session fetched");
  },
  searchUser: async (query) => {
    const supabase = createClient();

    // to get users where the query contains user name in db
    const { error, data } = await supabase
      .from("profiles")
      .select("*")
      .ilike("name", `%${query}%`);

    if (error) {
      console.log(error);
    }
    return data;
  },

  sendMessage: async () => {},
  fetchKeys: async () => {
    const supabase = createClient();
    const user = get().user;
    if (!user) return;

    // fetching keys from db
    const { data, error } = await supabase
      .from("user_keys")
      .select("public_key, encrypted_private_key, key_nonce")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching keys:", error);
      return;
    }

    // converting from base64
    await sodium.ready;

    // convert from base64
    const publicKey = sodium.from_base64(data.public_key);
    const encrypted_private_key = sodium.from_base64(
      data.encrypted_private_key
    );

    const nonce = sodium.from_base64(data.key_nonce);
    const encryptionKey = sodium.crypto_generichash(32, user.id);

    // decrypting private key from supabase
    const decryptedPrivateKey = sodium.crypto_secretbox_open_easy(
      encrypted_private_key,
      nonce,
      encryptionKey
    );

    set({
      keys: {
        publicKey: publicKey,
        privateKey: decryptedPrivateKey,
      },
    });
  },
}));
