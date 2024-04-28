"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChatLeftDots } from "react-icons/bs";
import { IoCompassOutline } from "react-icons/io5";
import { RiHome2Line } from "react-icons/ri";

function MobileNavItems() {
  const currentPath = usePathname();
  return (
    <nav className="md:hidden flex items-center px-3 py-1 fixed bottom-0 left-0 justify-center gap-10 w-full bg-white dark:bg-black border-t border-black dark:border-white">
      <Link href="/" className={currentPath === "/" ? "text-destructive" : ""}>
        <div className="hover:scale-110 transition-all duration-200 font-bold flex items-center gap-1 flex-col justify-center mb-1">
          <RiHome2Line className="text-3xl" />
          <span>Home</span>
        </div>
      </Link>

      <Link
        href="/chat"
        className={currentPath === "/chat" ? "text-destructive" : ""}
      >
        <div className="hover:scale-110 transition-all duration-200 font-bold flex items-center gap-1 flex-col justify-center mb-1">
          <BsChatLeftDots className="text-2xl" />

          <span>Chats</span>
        </div>
      </Link>

      <Link
        href="/discover"
        className={currentPath === "/discover" ? "text-destructive" : ""}
      >
        <div className="hover:scale-110 transition-all duration-200 font-bold flex items-center gap-1 flex-col justify-center mb-1">
          <IoCompassOutline className="text-3xl" />

          <span>Discover</span>
        </div>
      </Link>
    </nav>
  );
}

export default MobileNavItems;
