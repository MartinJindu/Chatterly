"use client";

import { Send } from "lucide-react";
import { Button } from "../ui/button";
import Textarea from "../ui/textarea";
import { useState } from "react";
import { sendMessage } from "@/lib/actions";

export default function ChatInput({
  recipientId,
  userId,
}: {
  recipientId: string;
  userId: string;
}) {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    await sendMessage({
      userId: userId,
      recipientId: recipientId,
      message: message.trim(),
    });
    // console.log(msg);

    setMessage("");
    console.log("message sent");
  };
  return (
    <div className="w-full z-20 p-3 border-t border-teal-700 sticky bottom-0 mt-14 md:mt-0 ">
      <div className="flex items-center gap-3">
        <Textarea name="message" value={message} setMessage={setMessage} />
        <div className="">
          <Button
            onClick={handleSendMessage}
            size={"icon"}
            className=" rounded-full p-2.5 text-center bg-teal-800 cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
