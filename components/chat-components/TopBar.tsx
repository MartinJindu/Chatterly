"use client";

import Image from "next/image";
import { FaCamera, FaDotCircle, FaPhone } from "react-icons/fa";
import { Button } from "../ui/button";
import { store } from "@/lib/store";
import { RecipientProps } from "@/app/chat/[id]/page";

export default function TopBar({
  showModal,
  setShowModal,
  recipientData,
  loading,
}: {
  setShowModal: (e: boolean) => void;
  showModal: boolean;
  loading: boolean;
  recipientData: RecipientProps;
}) {
  if (loading) {
    return <p>loading..</p>;
  }
  return (
    <div className="flex items-center justify-between p-3 pt-5 border-b border-teal-700 h-[72px] ">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        <Image
          src={
            recipientData?.avatar_url ||
            "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
          }
          alt="friend-img"
          height={30}
          width={30}
          className="w-12 h-12 rounded-full aspect-square object-cover"
        />
        <div>
          <p className=" text-lg font-semibold">{recipientData?.name}</p>
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
