"use client";
import { FaLock } from "react-icons/fa";
import Logo from "./sidebar-components/Logo";
import ChatSummary from "./sidebar-components/ChatSummary";

import { useAppStore } from "@/contextStore/AppContext";
import { Button } from "./ui/button";

export default function ChatLayout() {
  const { user, signOut } = useAppStore();

  return (
    <>
      <div className="hidden md:flex rounded-lg h-full md:flex-col w-full  my-auto items-center justify-center scrollbar-thin ">
        <Logo className="border-0" />
        <p className="font-semibold">Connect. Communicate. Collaborate.</p>
        <div className="flex items-center gap-2 mt-5">
          <FaLock />
          <p>End-to-end-encrypted</p>
        </div>
        <h1 className="text-white">{user?.user_metadata.full_name}</h1>
        <Button onClick={signOut} className="mt-3 cursor-pointer">
          Signout
        </Button>
      </div>

      <div className="md:hidden h-screen scrollbar-thin scrollbar-thumb-teal-700 scrollbar-track-teal-900/50 scroll-smooth ">
        <ChatSummary />
      </div>
    </>
  );
}
