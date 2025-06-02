import { FaLock } from "react-icons/fa";
import Logo from "./sidebar-components/Logo";
import ChatSummary from "./sidebar-components/ChatSummary";

export default function ChatLayout() {
  return (
    <>
      <div className="hidden md:flex md:flex-col items-center justify-center ">
        <Logo className="border-0" />
        <p className="font-semibold">Connect. Communicate. Collaborate.</p>
        <div className="flex items-center gap-2 mt-5">
          <FaLock />
          <p>End-to-end-encrypted</p>
        </div>
      </div>

      <div className="md:hidden">
        <ChatSummary />
      </div>
    </>
  );
}
