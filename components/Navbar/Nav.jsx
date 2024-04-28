"use client";

import { useState } from "react";
import AnotherNav from "@/components/Navbar/AnotherNav";
import Image from "next/image";
import { LuSearch } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import SideBar from "./SideBar";
import DesktopNavItems from "./NavItems/DesktopNavItems";
import MobileNavItems from "./NavItems/MobileNavItems";
import { UserButton } from "../auth/UserButton";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = useState();
  return (
    <>
      <nav className="fixed top-0 w-full flex px-3 py-1 justify-between items-center bg-white dark:bg-black border-b border-black dark:border-white z-[999]">
        <div className="flex gap-4 items-center">
          <div className="md:hidden">
            <AnotherNav isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/images/chatz.svg"
              width={35}
              height={35}
              priority
              alt="logo"
            />
            <span className="font-bold text-xl">Chatz</span>
          </div>
        </div>
        <DesktopNavItems />
        <MobileNavItems />
        <div className="flex gap-4 items-center">
          <Link
            href="/search"
            className="hover:scale-110 transition-all duration-200"
          >
            <LuSearch className="text-2xl" />
          </Link>
          <FaRegBell className="text-2xl" />
          {!isOpen && (
            <div className="md:hidden">
              <UserButton />
            </div>
          )}
        </div>
      </nav>
      <SideBar />
    </>
  );
};

export default Nav;
