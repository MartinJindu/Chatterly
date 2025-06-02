import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function SearchInput({
  inputClassName,
}: {
  inputClassName?: string;
}) {
  return (
    <div aria-label="search" className="p-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch size={16} className="text-teal-600" />
        </div>
        <Input
          type="text"
          placeholder="Search or start a new chat"
          className={cn(
            "pl-10 block w-full py-4 border border-b-4 border-teal-400 focus:outline-none focus:border-0 focus-visible:ring-2  focus-visible:ring-teal-500  placeholder:text-gray-400",
            inputClassName
          )}
        />
      </div>
    </div>
  );
}
