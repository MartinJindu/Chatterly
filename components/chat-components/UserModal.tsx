"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { RecipientProps } from "@/app/chat/[id]/page";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: RecipientProps;
}

export default function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // close modal by tapping outside the modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-xl p-6 w-[90%] max-w-sm shadow-xl relative"
      >
        <Button
          aria-label="close modal"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src={
              (user?.avatar_url as string) ||
              "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            }
            alt={user?.name as string}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-sm text-gray-300">{user?.bio}</p>
        </div>
      </div>
    </div>
  );
}
