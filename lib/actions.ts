"use server";
import sodium from "libsodium-wrappers";
import { store } from "./store";
import createClient from "./supabase/client";
import { Database } from "./supabase/database.types";

type Messages = {
  created_at: string | null;
  message: string;
  id: string;
  recipient_id: string | null;
  sender_id: string | null;
};

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
  await sodium.ready;
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
  console.log("message sent");
  // return data;
};

// export const decryptMessages = async (
//   messages: Messages[],
//   privateKey: Uint8Array<ArrayBufferLike>
// ) => {
//   await sodium.ready;

//   const supabase = createClient();
//   if (!privateKey) return [];

//   const decrypted = await Promise.all(
//     messages.map(async (msg) => {
//       const senderId = msg.sender_id;

//       // Fetch sender's public key
//       const { data: senderKey, error } = await supabase
//         .from("user_keys")
//         .select("public_key")
//         .eq("id", senderId!)
//         .single();

//       if (error) {
//         console.error("Sender public key fetch error:", error);
//         return { ...msg, decrypted: "[Error]" };
//       }

//       const senderPublicKey = sodium.from_base64(senderKey.public_key);
//       const nonce = sodium.from_base64(msg.nonce);
//       const cipher = sodium.from_base64(msg.encrypted_message);

//       try {
//         const plain = sodium.crypto_box_open_easy(
//           cipher,
//           nonce,
//           senderPublicKey,
//           privateKey
//         );
//         return { ...msg, decrypted: sodium.to_string(plain) };
//       } catch (e) {
//         return { ...msg, decrypted: "[Decryption Failed, not ur message]" };
//       }
//     })
//   );

//   return decrypted;
// };
