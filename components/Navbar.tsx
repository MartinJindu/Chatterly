"use client";

import { BsThreeDotsVertical } from "react-icons/bs";
import Logo from "./sidebar-components/Logo";
import { Button } from "./ui/button";
import SearchInput from "./sidebar-components/SearchInput";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  //
  // const hiddenPath = ['/chat/*']
  // Hide navbar when in chat page
  const shouldHideNavbar = pathName.startsWith("/chat/");

  if (shouldHideNavbar) return null;
  return (
    <nav
      aria-label="mobile navbar"
      id="navbar"
      className="flex flex-col md:hidden w-full px-1"
    >
      <div className="flex items-center justify-between w-full">
        <div>
          <Logo className="border-0" />
        </div>

        <Button className="bg-transparent">
          <BsThreeDotsVertical size={40} />
        </Button>
      </div>
      <SearchInput inputClassName="py-6 rounded-full" />
    </nav>
  );
}
