"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore } from "@/contextStore/AppContext";

interface Chat {
  userId: string;
  name: string | null;
  avatar_url: string | null;
  message: string;
  created_at: string;
}

export default function ChatSummary() {
  const { user, supabase } = useAppStore();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchChats() {
    if (!user || !supabase) return;

    setLoading(true);
    try {
      const { data: messages, error: messagesError } = await supabase
        .from("messages")
        .select("id, sender_id, recipient_id, message, created_at")
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order("created_at", { ascending: false })
        .limit(100);

      if (messagesError || !messages) {
        console.error("Error fetching messages:", messagesError);
        return;
      }

      // Extract unique conversation partner IDs
      const userIds: string[] = [];
      messages.forEach((msg) => {
        const otherId =
          msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
        if (!userIds.includes(otherId!)) {
          userIds.push(otherId!);
        }
      });

      // Fetch all profile data
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, name, avatar_url")
        .in("id", userIds);

      if (profilesError || !profiles) {
        console.error("Error fetching profiles:", profilesError);
        return;
      }

      // Map profiles by ID
      const profileMap: Record<
        string,
        { name: string | null; avatar_url: string | null }
      > = {};
      profiles.forEach((profile) => {
        profileMap[profile.id] = {
          name: profile.name,
          avatar_url: profile.avatar_url,
        };
      });

      // Get latest message per user
      const latestMessages: Record<
        string,
        { message: string; created_at: string }
      > = {};

      messages.forEach((msg) => {
        const otherUserId =
          msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;

        if (
          !latestMessages[otherUserId!] ||
          new Date(msg.created_at!) >
            new Date(latestMessages[otherUserId!].created_at)
        ) {
          latestMessages[otherUserId!] = {
            message: msg.message,
            created_at: msg.created_at!,
          };
        }
      });

      // Build chat list
      const chatList: Chat[] = userIds.map((id) => ({
        userId: id,
        name: profileMap[id]?.name || "Unknown",
        avatar_url: profileMap[id]?.avatar_url || null,
        message: latestMessages[id]?.message || "",
        created_at: latestMessages[id]?.created_at || "",
      }));

      // Sort chats by latest message
      chatList.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setChats(chatList);
    } catch (error) {
      console.error("Unexpected error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchChats();
  }, [user, supabase]);

  if (loading) {
    return <p className="p-4 text-teal-100">Loading chats...</p>;
  }

  if (chats.length === 0) {
    return <p className="p-4 text-teal-100">No chats yet</p>;
  }

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-teal-700 scrollbar-track-teal-900/50">
      {chats.map((chat) => (
        <Link href={`/chat/${chat.userId}`} key={chat.userId}>
          <div className="flex items-center gap-4 px-4 py-3 cursor-pointer rounded-sm hover:bg-teal-900/30">
            <div>
              <Image
                src={
                  chat.avatar_url ||
                  "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                }
                alt="friend-img"
                height={30}
                width={30}
                className="w-12 h-12 rounded-full aspect-square object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-base font-medium text-teal-100 truncate">
                  {chat.name}
                </p>
                <p className="text-xs text-teal-300">
                  {new Date(chat.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "numeric",
                  })}
                </p>
              </div>
              <p className="text-start text-sm text-teal-200 truncate">
                {chat.message}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
