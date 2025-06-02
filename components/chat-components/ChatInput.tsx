import { Send } from "lucide-react";
import { Button } from "../ui/button";
import Textarea from "../ui/textarea";

export default function ChatInput() {
  return (
    <div className=" w-full z-20 p-3 border-t border-teal-700 ">
      <div className="flex items-center gap-3">
        <Textarea />
        <div className="rounded-full">
          <Button className="w-full rounded-full p-5 text-center bg-teal-800 cursor-pointer">
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}
