"use client";
import { FaLock } from "react-icons/fa";
import Logo from "./sidebar-components/Logo";
import ChatSummary from "./sidebar-components/ChatSummary";
import { store } from "@/lib/store";
import { useEffect } from "react";

export default function ChatLayout() {
  const { user, checkSession, signOut, fetchKeys } = store();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    fetchKeys();
  }, []);
  // console.log(user?.user_metadata);

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
        <button onClick={signOut}>signout</button>
      </div>

      <div className="md:hidden">
        <ChatSummary />
      </div>
    </>
  );
}
