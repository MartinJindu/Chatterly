import { useEffect } from "react";
import createClient from "../supabase/client";

export function useRealtimeMessages(
  userId: string,
  onNewMessage: (message: any) => void
) {
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          console.log("📩 New message:", payload.new);
          onNewMessage(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onNewMessage]);
}
