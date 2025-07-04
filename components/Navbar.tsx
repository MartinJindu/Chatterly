"use client";

import { PowerIcon } from "lucide-react";
import Logo from "./sidebar-components/Logo";
import { Button } from "./ui/button";
import SearchInput from "./sidebar-components/SearchInput";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/contextStore/AppContext";

export default function Navbar() {
  const pathName = usePathname();
  const { signOut } = useAppStore();

  //
  const hiddenPath = ["/login", "/signup"];
  // Hide navbar when in chat page
  const shouldHideNavbar =
    pathName.startsWith("/chat/") || hiddenPath.includes(pathName);

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

        <Button
          size={"icon"}
          className="bg-teal-700/30 hover:bg-teal-700/20 rounded-full cursor-pointer"
          onClick={signOut}
        >
          <PowerIcon size={40} />
        </Button>
      </div>
      <SearchInput inputClassName="py-6 rounded-full" />
    </nav>
  );
}
