import Image from "next/image";
import { FaCamera, FaDotCircle, FaPhone } from "react-icons/fa";
import { Button } from "../ui/button";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between p-3 pt-5 border-b border-teal-700 h-[72px] ">
      <div className="flex items-center gap-3">
        <Image
          src={
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDYe-C-ulhMzH1ZxQw7b86sEX9KFcsDj5CFfsh9urgGj_WAJ2PPjfIEaiTdMJevhEGKlIHnlEcq1o0gQ-fph8MK8_JsH2XYpxjxFTLJkcgYsxQTieN7-h7cdaxibgCizjPkiTQDi1bgjpp0Q9vAKWLmt72CbOvlHaCkhfP_8QABjvkBbRPJE2vFQxLNc7OTScBVwqE8BagRLBf09E0mo_97_b6NlNpxOuZhRLTo9CLbToJSWQkQaZz6zVbfxdsrhHHxu1OkZyyunEE"
          }
          alt="friend-img"
          height={30}
          width={30}
          className="w-12 h-12 rounded-full aspect-square bg-cover"
        />
        <div>
          <p className=" text-lg font-semibold">Liam</p>
          <p className=" text-xs">Online</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          disabled
          className="text-teal-500 hover:text-teal-400 p-2 rounded-full hover:bg-teal-800/50"
        >
          <span className="">
            <FaPhone />
          </span>
        </Button>
        <Button
          size={"icon"}
          disabled
          className="text-teal-500 hover:text-teal-400 p-2 rounded-full hover:bg-teal-800/50"
        >
          <span className="">
            <FaCamera />
          </span>
        </Button>
        {/* <Button
          size={"icon"}
          className="text-teal-500 hover:text-teal-400 p-2 rounded-full hover:bg-teal-800/50"
        >
          <span className="">
            <FaDotCircle />
          </span>
        </Button> */}
      </div>
    </div>
  );
}
