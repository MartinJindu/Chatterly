"use client";
import { FaLock } from "react-icons/fa";
import Logo from "./sidebar-components/Logo";
import ChatSummary from "./sidebar-components/ChatSummary";
import { authStore } from "@/lib/authStore";
import { useEffect } from "react";

export default function ChatLayout() {
  const { user, checkSession, signOut } = authStore();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <div className="hidden md:flex md:flex-col w-full md:h-screen my-auto items-center justify-center ">
        <Logo className="border-0" />
        <p className="font-semibold">Connect. Communicate. Collaborate.</p>
        <div className="flex items-center gap-2 mt-5">
          <FaLock />
          <p>End-to-end-encrypted</p>
        </div>
        <h1 className="text-white">{user?.email}</h1>
        <button onClick={signOut}>signout</button>
      </div>

      <div className="md:hidden">
        <ChatSummary />
      </div>
    </>
  );
}
