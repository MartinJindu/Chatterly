import Image from "next/image";

export default function ChatWindow() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
      <div aria-label="sent message" className="flex items-end gap-2.5">
        <Image
          src={
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDYe-C-ulhMzH1ZxQw7b86sEX9KFcsDj5CFfsh9urgGj_WAJ2PPjfIEaiTdMJevhEGKlIHnlEcq1o0gQ-fph8MK8_JsH2XYpxjxFTLJkcgYsxQTieN7-h7cdaxibgCizjPkiTQDi1bgjpp0Q9vAKWLmt72CbOvlHaCkhfP_8QABjvkBbRPJE2vFQxLNc7OTScBVwqE8BagRLBf09E0mo_97_b6NlNpxOuZhRLTo9CLbToJSWQkQaZz6zVbfxdsrhHHxu1OkZyyunEE"
          }
          alt="person 1"
          height={12}
          width={12}
          className="w-6 h-6 rounded-full aspect-square bg-cover shrink-0"
        />
        <div className="flex flex-col  gap-1 max-w-[calc(100%-3.5rem)]">
          <div className="bg-gray-700 p-3 rounded-lg shadow-sm">
            <p className="text-sm ">Hey Sophia, how are you?</p>
          </div>
          <p className="text-xs  self-start">Liam • 10:15 AM</p>
        </div>
      </div>

      <div
        aria-label="received message"
        className="flex items-end gap-2.5 justify-end"
      >
        <div className="flex flex-col gap-1 max-w-[calc(100%-3.5rem)]">
          <div className="bg-gray-700 p-3 rounded-lg shadow-sm">
            <p className="text-sm ">I'm doing great, thanks! How about you?</p>
          </div>
          <p className="text-xs  self-end">Sophia • 10:16 AM</p>
        </div>
        <Image
          src={
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCLzTAooH7Gsg8r1AZsXwPAXhWJmpPY1bHw8A2JGELlVSKuEUTXjBtWD_OFJdNQOBIzo3QB0cRzSkk21z_LBGurrXGxBKipi1BehYm_uaVJCsSxMw_EtW-c1Zsmzha06dal9GEaEQqJGQ_dJEm86xM8vpbXYfs6_aE2wH3FAWVtBKPV0qhpDIaXE8pd8la-_Uhf_YVllhgc6BODzr1M7e4HdzBqDTVHoOwMc9yqTjCdeGXD6sikxHYipfy-rBwHr74IsenN0_nJ9Qk"
          }
          alt="person 2"
          height={12}
          width={12}
          className="w-6 h-6 rounded-full aspect-square bg-cover shrink-0"
        />
      </div>
    </div>
  );
}
