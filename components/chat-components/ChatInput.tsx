import { Send } from "lucide-react";
import { Button } from "../ui/button";
import Textarea from "../ui/textarea";

export default function ChatInput() {
  return (
    <div className="w-full z-20 p-3 border-t border-teal-700 sticky bottom-0 mt-14 md:mt-0 ">
      <div className="flex items-center gap-3">
        <Textarea />
        <div className="">
          <Button
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
