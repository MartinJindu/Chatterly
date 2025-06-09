"use client";

import Image from "next/image";
import { FaCamera, FaPhone } from "react-icons/fa";
import { Button } from "../ui/button";
import { RecipientProps } from "@/app/chat/[id]/page";

export default function TopBar({
  showModal,
  setShowModal,
  recipientData,
  loading,
  isRecipientOnline,
}: {
  setShowModal: (e: boolean) => void;
  showModal: boolean;
  loading: boolean;
  recipientData: RecipientProps;
  isRecipientOnline: boolean;
}) {
  if (loading) {
    return <p className="p-3 text-teal-100">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-between p-3 pt-5 border-b border-teal-700 h-[72px]">
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
          <p className="text-lg font-semibold text-teal-100">
            {recipientData?.name || "Unknown"}
          </p>
          <p className="text-xs flex items-center gap-1">
            {isRecipientOnline ? (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            ) : (
              <span className="relative flex h-2 w-2">
                <span className=" absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
              </span>
            )}
            <span
              className={isRecipientOnline ? "text-green-400" : "text-gray-400"}
            >
              {isRecipientOnline ? "Online" : "Offline"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          disabled
          className="text-teal-500 hover:text-teal-400 p-2 rounded-full hover:bg-teal-800/50"
        >
          <span>
            <FaPhone />
          </span>
        </Button>
        <Button
          size={"icon"}
          disabled
          className="text-teal-500 hover:text-teal-400 p-2 rounded-full hover:bg-teal-800/50"
        >
          <span>
            <FaCamera />
          </span>
        </Button>
      </div>
    </div>
  );
}
