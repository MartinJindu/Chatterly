import Image from "next/image";
import Link from "next/link";

const chats = [
  {
    name: "Liam",
    time: "10.30 AM",
    msg: "I might go out for dinner with friends.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYe-C-ulhMzH1ZxQw7b86sEX9KFcsDj5CFfsh9urgGj_WAJ2PPjfIEaiTdMJevhEGKlIHnlEcq1o0gQ-fph8MK8_JsH2XYpxjxFTLJkcgYsxQTieN7-h7cdaxibgCizjPkiTQDi1bgjpp0Q9vAKWLmt72CbOvlHaCkhfP_8QABjvkBbRPJE2vFQxLNc7OTScBVwqE8BagRLBf09E0mo_97_b6NlNpxOuZhRLTo9CLbToJSWQkQaZz6zVbfxdsrhHHxu1OkZyyunEE",
    linkId: "1",
  },
  {
    name: "Ava",
    time: "Yesterday",
    msg: "See ya tomorrow",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtXDltCZuSdBO7ZIvotZLbRhzYHS4zh-HIj-C23HIlqrE-iOYTQ8yobNg_Y2T3O1HHwpfRmJ3kir6l-IhSLoXfPKGDteQS8_MW4ILs4DBRKAGSWszf5P7FwbeHF5J8jJQp7iiFGG5-NNRR6om_vVg_4YHjr4uvV3K-QalO5h0fHtnmqXi6YCrZzqfitEDY6Z6iYgHw6eKNQgB1xrXlRt-5ZwAQdN-tN_8glLbGoVww02Ex2Bc6JJmxJwXDHr0cMY8BbKwidO9F0CA",
    linkId: "12",
  },
];

export default function ChatSummary() {
  return (
    <div className="flex-1 overflow-y-auto scroll-smooth ">
      {chats.map((chat, i) => (
        <Link href={`/chat/${chat.linkId}`} key={i}>
          <div className="flex items-center gap-4 px-4 py-3 cursor-pointer rounded-sm hover:bg-teal-900/30 ">
            <div>
              <Image
                src={chat.img}
                alt="friend-img"
                height={30}
                width={30}
                className="w-12 h-12 rounded-full aspect-square object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 ">
              <div className="flex justify-between items-center">
                <p className=" text-base font-medium truncate">{chat.name}</p>
                <p className=" text-xs">{chat.time}</p>
              </div>
              <p className="text-start text-sm truncate">{chat.msg}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
