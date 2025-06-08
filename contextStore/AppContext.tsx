"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import sodium from "libsodium-wrappers";
import createClient from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/database.types";

// Define types
type SearchUser =
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
  loading: boolean;
  keys: UserKey | null;
  supabase: SupabaseClient<Database>;
  loginWithGoogle: (redirectTo?: string) => Promise<void>;
  checkSession: () => Promise<void>;
  signOut: () => Promise<void>;
  searchUser: (query: string) => Promise<SearchUser>;
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  // fetchKeys: () => Promise<void>;
}

// Create context
const AppContext = createContext<StoreState | undefined>(undefined);

// Context Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [keys, setKeys] = useState<UserKey | null>(null);

  const supabase = createClient();

  // Initialize Supabase client and check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user || null);
    setLoading(false);
    console.log("session fetched");
  };

  const loginWithGoogle = async (redirectTo = "/") => {
    setLoading(true);
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
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setKeys(null);
    redirect("/login");
  };

  const searchUser = async (query: string) => {
    const { error, data } = await supabase
      .from("profiles")
      .select("*")
      .ilike("name", `%${query}%`);

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  };

  const sendMessage = async (receiverId: string, content: string) => {};

  // const fetchKeys = async () => {
  //   if (!user || keys) return;

  //   const { data, error } = await supabase
  //     .from("user_keys")
  //     .select("public_key, encrypted_private_key, key_nonce")
  //     .eq("id", user.id)
  //     .single();

  //   if (error) {
  //     console.error("Error fetching keys:", error);
  //     return;
  //   }

  //   await sodium.ready;

  //   const publicKey = sodium.from_base64(data.public_key);
  //   const encrypted_private_key = sodium.from_base64(
  //     data.encrypted_private_key
  //   );
  //   const nonce = sodium.from_base64(data.key_nonce);
  //   const encryptionKey = sodium.crypto_generichash(32, user.id);

  //   const decryptedPrivateKey = sodium.crypto_secretbox_open_easy(
  //     encrypted_private_key,
  //     nonce,
  //     encryptionKey
  //   );

  //   setKeys({
  //     publicKey,
  //     privateKey: decryptedPrivateKey,
  //   });
  // };

  const value: StoreState = useMemo(
    () => ({
      user,
      loading,
      keys,
      supabase,
      loginWithGoogle,
      signOut,
      checkSession,
      searchUser,
      sendMessage,
      // fetchKeys,
    }),
    [
      user,
      loading,
      keys,
      loginWithGoogle,
      signOut,
      checkSession,
      searchUser,
      // fetchKeys,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
