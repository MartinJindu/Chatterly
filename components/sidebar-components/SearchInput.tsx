"use client";

import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { store } from "@/lib/store";
import { useState } from "react";
import SearchModal from "./SearchModal";

type Props = {
  inputClassName?: string;
};

export default function SearchInput({ inputClassName }: Props) {
  const [name, setName] = useState<string>("");
  const [modalData, setModalData] = useState<any[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { searchUser } = store();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!name.trim()) return;

    if (e.key === "Enter") {
      const data = await searchUser(name);
      setModalData(data);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
    setName("");
  };

  return (
    <div aria-label="search" className="p-2 relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch size={16} className="text-teal-600" />
        </div>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search or start a new chat"
          className={cn(
            "pl-10 block w-full py-4 border border-b-4 border-teal-400 focus:outline-none focus:border-0 focus-visible:ring-2  focus-visible:ring-teal-500  placeholder:text-gray-400",
            inputClassName
          )}
        />
      </div>

      {showModal && <SearchModal users={modalData} onClose={closeModal} />}
    </div>
  );
}
