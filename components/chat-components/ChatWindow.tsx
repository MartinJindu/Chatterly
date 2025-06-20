"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useAppStore } from "@/contextStore/AppContext";

interface Message {
  id: string;
  sender_id: string | null;
  recipient_id: string | null;
  message: string;
  created_at: string | null;
}

interface Profile {
  id: string;
  name: string;
  avatar_url: string | null;
}

const ChatWindow = ({ otherUserId }: { otherUserId: string }) => {
  const { user, loading: contextLoading, supabase } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<{ [key: string]: Profile }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Log user and otherUserId for debugging
  // useEffect(() => {
  //   console.log("User:", user?.id, "OtherUserId:", otherUserId);
  // }, [user, otherUserId]);

  // Fetch profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user || !otherUserId) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, avatar_url")
        .in("id", [user.id, otherUserId]);

      if (error) {
        console.error("Error fetching profiles:", error);
        return;
      }

      const profileMap = data.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as { [key: string]: Profile });

      setProfiles(profileMap);
      // console.log("Profiles fetched:", profileMap);
    };

    fetchProfiles();
  }, [user, otherUserId, supabase]);

  // Fetch messages
  useEffect(() => {
    const loadMessages = async () => {
      if (!user || !otherUserId) return;

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(
            `and(recipient_id.eq.${user.id},sender_id.eq.${otherUserId}),and(sender_id.eq.${user.id},recipient_id.eq.${otherUserId})`
          )
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching messages:", error);
          setError("Failed to fetch messages");
          return;
        }

        // console.log("Fetched messages:", data);
        setMessages(data || []);
      } catch (err) {
        console.error("Error in loadMessages:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (user && otherUserId) {
      loadMessages();
    }
  }, [user, otherUserId, supabase]);

  // Real-time subscription with client-side filtering
  useEffect(() => {
    if (!user || !otherUserId) return;

    const channelName = `messages:${user.id}:${otherUserId}`;
    // console.log("Setting up subscription for channel:", channelName);

    const subscription = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message;
          // console.log("New message payload:", newMessage);

          if (
            (newMessage.recipient_id === user.id &&
              newMessage.sender_id === otherUserId) ||
            (newMessage.sender_id === user.id &&
              newMessage.recipient_id === otherUserId)
          ) {
            setMessages((prev) => {
              if (prev.some((msg) => msg.id === newMessage.id)) {
                // console.log("Duplicate message ignored:", newMessage.id);
                return prev;
              }
              return [...prev, newMessage].sort(
                (a, b) =>
                  new Date(a.created_at!).getTime() -
                  new Date(b.created_at!).getTime()
              );
            });
          } else {
            console.log(
              "Message ignored (not part of this conversation):",
              newMessage
            );
          }
        }
      )
      .subscribe();

    return () => {
      // console.log("Unsubscribing from channel:", channelName);
      subscription.unsubscribe();
    };
  }, [user, otherUserId, supabase]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (contextLoading || loading) {
    return <div className="p-4 text-teal-100">Loading messages...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-700 scrollbar-track-teal-900/50 p-4 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <p className="text-teal-100">No messages in this chat</p>
        ) : (
          messages.map((msg) => {
            const isSender = msg.sender_id === otherUserId;
            const profile = profiles[msg.sender_id!] || {
              name: "Unknown",
              avatar_url: null,
            };

            return (
              <div
                key={msg.id}
                aria-label={isSender ? "received message" : "sent message"}
                className={`flex items-end gap-2.5 ${
                  isSender ? "justify-start" : "justify-end"
                }`}
              >
                {isSender && (
                  <Image
                    src={profile.avatar_url || "/default-avatar.png"}
                    alt={profile.name}
                    height={24}
                    width={24}
                    className="w-6 h-6 rounded-full aspect-square bg-cover shrink-0"
                  />
                )}
                <div className="flex flex-col gap-1 max-w-[calc(100%-3.5rem)]">
                  <div
                    className={`p-3 rounded-lg shadow-sm ${
                      isSender ? "bg-teal-800" : "bg-gray-700"
                    }`}
                  >
                    <p className="text-sm text-teal-100">{msg.message}</p>
                  </div>
                  <p
                    className={`text-xs text-teal-300 ${
                      isSender ? "self-start" : "self-end"
                    }`}
                  >
                    {profile.name} •{" "}
                    {new Date(msg.created_at!).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!isSender && (
                  <Image
                    src={
                      profiles[user?.id as string]?.avatar_url ||
                      "/default-avatar.png"
                    }
                    alt={profiles[user?.id as string]?.name || "You"}
                    height={24}
                    width={24}
                    className="w-6 h-6 rounded-full aspect-square bg-cover shrink-0"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
