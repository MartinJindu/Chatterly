"use client";

import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

type User = {
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  id: string;
  name: string;
};

type Props = {
  users: User[] | null;
  onClose: () => void;
};

export default function SearchModal({ users, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  // close modal by tapping outside the modal
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       onClose();
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onClose]);

  return (
    <div className="absolute top-20 left-0 w-full mx-auto bg-gray-700 rounded-md shadow-2xl z-50 p-4 max-h-[300px] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-200">Search Results</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-red-500">
          <X size={18} />
        </button>
      </div>

      {users && users.length > 0 ? (
        <ul className="space-y-3">
          {users.map((user) => (
            <Link href={`/chat/${user.id}`} key={user.id} onClick={onClose}>
              <li
                key={user.id}
                className="flex items-center gap-3 rounded-sm  hover:bg-teal-900 p-2 "
              >
                <Image
                  src={user.avatar_url || "/default-avatar.png"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-gray-200 font-medium">
                  {user.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-200">No users found.</p>
      )}
    </div>
  );
}
