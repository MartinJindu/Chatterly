"use client";
import ChatInput from "@/components/chat-components/ChatInput";
import ChatWindow from "@/components/chat-components/ChatWindow";
import TopBar from "@/components/chat-components/TopBar";
import UserModal from "@/components/chat-components/UserModal";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Chat() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const user = {
    name: "Sophia Liam",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYe-C-ulhMzH1ZxQw7b86sEX9KFcsDj5CFfsh9urgGj_WAJ2PPjfIEaiTdMJevhEGKlIHnlEcq1o0gQ-fph8MK8_JsH2XYpxjxFTLJkcgYsxQTieN7-h7cdaxibgCizjPkiTQDi1bgjpp0Q9vAKWLmt72CbOvlHaCkhfP_8QABjvkBbRPJE2vFQxLNc7OTScBVwqE8BagRLBf09E0mo_97_b6NlNpxOuZhRLTo9CLbToJSWQkQaZz6zVbfxdsrhHHxu1OkZyyunEE",
    bio: "Fullstack developer who loves building sleek UI with Tailwind and Next.js.",
  };
  return (
    <div className="flex flex-col h-screen relative md:rounded-lg bg-teal-900/20 ">
      <TopBar showModal={showModal} setShowModal={setShowModal} />
      <div className="flex-1 overflow-y-auto">
        <ChatWindow />
      </div>

      <ChatInput />
      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        user={user}
      />
    </div>
  );
}
