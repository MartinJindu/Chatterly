"use client";
import ChatInput from "@/components/chat-components/ChatInput";
import ChatWindow from "@/components/chat-components/ChatWindow";
import TopBar from "@/components/chat-components/TopBar";
import { useParams } from "next/navigation";

export default function Chat() {
  const { id } = useParams();
  return (
    <div className="flex flex-col h-screen flex-1">
      <TopBar />
      <div className="flex-1 overflow-y-auto">
        <ChatWindow />
      </div>

      <ChatInput />
    </div>
  );
}
