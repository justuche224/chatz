"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChatLeftDots } from "react-icons/bs";
import { IoCompassOutline } from "react-icons/io5";
import { RiHome2Line } from "react-icons/ri";

function DesktopNavItems() {
  const currentPath = usePathname();
  return (
    <nav className="md:flex hidden items-center px-3 py-1 justify-center gap-10 w-full">
      <Link href="/" className={currentPath === "/" ? "text-destructive" : ""}>
        <div className="hover:scale-110 transition-all duration-200 flex items-center gap-1 justify-center mb-1 font-bold">
          <RiHome2Line className="text-3xl" />
          <span>Home</span>
        </div>
      </Link>
      <Link
        href="/chat"
        className={currentPath === "/chat" ? "text-destructive" : ""}
      >
        <div className="hover:scale-110 transition-all duration-200 flex items-center gap-1 justify-center mb-1 font-bold">
          <BsChatLeftDots className="text-2xl" />
          <span>Chats</span>
        </div>
      </Link>
      <Link
        href="/discover"
        className={currentPath === "/discover" ? "text-destructive" : ""}
      >
        <div className="hover:scale-110 transition-all duration-200 flex items-center gap-1 justify-center mb-1 font-bold">
          <IoCompassOutline className="text-3xl" />
          <span>Discover</span>
        </div>
      </Link>
    </nav>
  );
}

export default DesktopNavItems;
