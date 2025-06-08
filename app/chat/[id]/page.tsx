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
  name: string;
  bio: string | null;
} | null;

export default function Chat() {
  const [recipientData, setRecipientData] = useState<RecipientProps | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user: storeUser, supabase } = useAppStore();
  const { id: recipientId } = useParams();

  const fetchOtherUserDetails = async () => {
    setLoading(true);
    const { error, data } = await supabase
      .from("profiles")
      .select("avatar_url, name, bio")
      .eq("id", recipientId as string)
      .single();

    console.log(data?.name);

    if (error) {
      console.log("error", error);
      setLoading(false);
    }

    setRecipientData(data);
    setLoading(false);
  };
  // console.log(recipientData);

  useEffect(() => {
    fetchOtherUserDetails();
  }, [recipientId]);

  const user = {
    name: "Sophia Liam",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYe-C-ulhMzH1ZxQw7b86sEX9KFcsDj5CFfsh9urgGj_WAJ2PPjfIEaiTdMJevhEGKlIHnlEcq1o0gQ-fph8MK8_JsH2XYpxjxFTLJkcgYsxQTieN7-h7cdaxibgCizjPkiTQDi1bgjpp0Q9vAKWLmt72CbOvlHaCkhfP_8QABjvkBbRPJE2vFQxLNc7OTScBVwqE8BagRLBf09E0mo_97_b6NlNpxOuZhRLTo9CLbToJSWQkQaZz6zVbfxdsrhHHxu1OkZyyunEE",
    bio: "Fullstack developer who loves building sleek UI with Tailwind and Next.js.",
  };
  return (
    <div className="flex flex-col h-screen relative md:rounded-lg bg-teal-900/20 ">
      <TopBar
        loading={loading}
        recipientData={recipientData}
        showModal={showModal}
        setShowModal={setShowModal}
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
