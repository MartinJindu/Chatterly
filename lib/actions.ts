"use server";
import createClient from "./supabase/client";

// type Messages = {
//   created_at: string | null;
//   message: string;
//   id: string;
//   recipient_id: string | null;
//   sender_id: string | null;
// };

export const sendMessage = async ({
  userId,
  recipientId,
  message,
}: {
  userId: string;
  recipientId: string;
  message: string;
}) => {
  console.log("sending message");
  const supabase = createClient();

  if (!userId || !recipientId || !message.trim()) {
    console.error("Invalid userId, recipientId, or message");
    return;
  }

  // store to Supabase
  const { error } = await supabase.from("messages").insert({
    sender_id: userId,
    recipient_id: recipientId,
    message: message,
  });

  if (error) {
    console.log("Insert error", error);
    return;
  }
  // console.log("message sent");
  // return data;
};
