"use client";
import ChatInput from "@/components/chat-components/ChatInput";
import ChatWindow from "@/components/chat-components/ChatWindow";
import TopBar from "@/components/chat-components/TopBar";
import { useParams } from "next/navigation";

export default function Chat() {
  const { id } = useParams();
  return (
    <div className="flex flex-col flex-1 min-h-screen overflow-hidden relative">
      <TopBar />
      <ChatWindow />
      <ChatInput />
    </div>
  );
}
