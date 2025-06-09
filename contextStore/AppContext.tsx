"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
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

type PresenceState = Record<
  string,
  { userId: string; online: boolean; presence_ref: string }[]
>;

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
  isUserOnline: (userId: string) => boolean;
}

// Create context
const AppContext = createContext<StoreState | undefined>(undefined);

// Context Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [presenceState, setPresenceState] = useState<PresenceState>({});
  const [keys, setKeys] = useState<UserKey | null>(null);

  const supabase = createClient();

  // Initialize Supabase client and check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Set up presence tracking
  useEffect(() => {
    if (!user || !supabase) return;

    // create presence channel
    const presenceChannel = supabase.channel("online-users", {
      config: {
        presence: {
          key: user.id, // unique for each user
        },
      },
    });

    // Define the current user's presence data
    const userStatus = { userId: user.id, online: true };

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState();
        // console.log("Presence sync:", state);
        setPresenceState(state as PresenceState);
      })
      // When someone joins (comes online)
      .on("presence", { event: "join" }, ({ key: userId, newPresences }) => {
        // console.log("User joined:", userId, newPresences);
        setPresenceState((prev: any) => ({
          ...prev,
          [userId]: newPresences,
        }));
      })
      // When someone leaves (goes offline)
      .on("presence", { event: "leave" }, ({ key: userId, leftPresences }) => {
        // console.log("User left:", userId, leftPresences);
        setPresenceState((prev: any) => {
          const newState = { ...prev };
          delete newState[userId];
          return newState;
        });
      })
      // Subscribe and track the current user's presence
      .subscribe(async (status) => {
        // console.log("Presence subscription status:", status);
        if (status === "SUBSCRIBED") {
          await presenceChannel.track(userStatus);
          // console.log("Tracking user status:", userStatus);
        }
      });

    // Clean up when component unmounts or dependencies change
    return () => {
      // console.log("Unsubscribing from presence channel");
      presenceChannel.untrack().then(() => {
        presenceChannel.unsubscribe();
      });
    };
  }, [user, supabase]);

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
      .ilike("name", `%${query}%`)
      .filter("id", "neq", user?.id || ""); // to not return logged in user

    if (error) {
      console.log(error);
      return null;
    }

    // const filtered = data.filter(profile => profile.id !== user?.id)
    return data;
  };

  const sendMessage = async (receiverId: string, content: string) => {};

  // to get users that are online
  const isUserOnline = (userId: string): boolean => {
    const userPresence = presenceState[userId];
    return !!userPresence && userPresence[0]?.online;
  };

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
      isUserOnline,
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
      isUserOnline,
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
