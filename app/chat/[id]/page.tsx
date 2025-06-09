"use client";

import ChatInput from "@/components/chat-components/ChatInput";
import ChatWindow from "@/components/chat-components/ChatWindow";
import TopBar from "@/components/chat-components/TopBar";
import UserModal from "@/components/chat-components/UserModal";
import { useAppStore } from "@/contextStore/AppContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type RecipientProps = {
  avatar_url: string | null;
  name: string | null;
  bio: string | null;
} | null;

export default function Chat() {
  const [recipientData, setRecipientData] = useState<RecipientProps>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user: storeUser, supabase, isUserOnline } = useAppStore();
  const { id: recipientId } = useParams();

  // Fetch recipient details
  const fetchOtherUserDetails = async () => {
    setLoading(true);
    const { error, data } = await supabase
      .from("profiles")
      .select("avatar_url, name, bio")
      .eq("id", recipientId as string)
      .single();

    if (error) {
      console.error("Failed to fetch profile:", error);
      setLoading(false);
      return;
    }

    setRecipientData(data);
    // console.log("Recipient name:", data?.name);
    setLoading(false);
  };

  const isRecipientOnline = recipientId
    ? isUserOnline(recipientId as string)
    : false;

  useEffect(() => {
    fetchOtherUserDetails();
  }, [recipientId]);

  return (
    <div className="flex flex-col h-screen relative md:rounded-lg bg-teal-900/20">
      <TopBar
        loading={loading}
        recipientData={recipientData}
        showModal={showModal}
        setShowModal={setShowModal}
        isRecipientOnline={isRecipientOnline}
      />
      <div className="flex-1 overflow-y-auto">
        <ChatWindow otherUserId={recipientId as string} />
      </div>
      <ChatInput
        userId={storeUser?.id as string}
        recipientId={recipientId as string}
      />
      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        user={recipientData}
      />
    </div>
  );
}
