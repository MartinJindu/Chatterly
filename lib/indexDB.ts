// lib/indexedDB.ts
import { openDB, DBSchema, IDBPDatabase } from "idb";

interface ChatDB extends DBSchema {
  messages: {
    key: string;
    value: {
      id: string;
      sender_id: string | null;
      recipient_id: string | null;
      message: string;
      created_at: string | null;
    };
  };
}

const dbPromise = openDB<ChatDB>("chat-app", 1, {
  upgrade(db) {
    db.createObjectStore("messages", { keyPath: "id" });
  },
});

export const storeMessageInIndexedDB = async (
  message: ChatDB["messages"]["value"]
) => {
  const db = await dbPromise;
  await db.put("messages", message);
};

export const getMessagesFromIndexedDB = async (
  userId: string,
  otherUserId: string
) => {
  const db = await dbPromise;
  const tx = db.transaction("messages", "readonly");
  const store = tx.objectStore("messages");
  const allMessages = await store.getAll();
  return allMessages.filter(
    (msg) =>
      (msg.sender_id === otherUserId && msg.recipient_id === userId) ||
      (msg.sender_id === userId && msg.recipient_id === otherUserId)
  );
};
