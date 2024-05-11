"use client";

import Link from "next/link";
import { UserButton } from "../auth/UserButton";
import { LuUsers2 } from "react-icons/lu";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const currentPath = usePathname();
  return (
    <div
      id="menu"
      className="md:flex fixed top-0 left-0 hidden flex-col gap-5 justify-between items-center text-center min-h-[100vh] max-h-[100vh] overflow-y-auto dark:bg-black dark:text-white bg-gray-200 px-3 pt-14 shadow-md border-r border-black dark:border-white"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center py-2">
            <UserButton />
          </div>
        </div>

        <span className="w-full h-[2px] bg-red-500 my-5"></span>

        <div className="text-lg font-bold flex flex-col gap-3 items-center text-center">
          <div className="flex gap-5 items-center">
            <span
              className="hover:scale-125 transition-all duration-200 cursor-pointer"
              title="Friends"
            >
              <Link
                href="/friends"
                className={currentPath === "/friends" ? "text-destructive" : ""}
              >
                <LuUsers2 />
              </Link>
            </span>
          </div>

          <div className="flex gap-5 items-center">
            <span className="cursor-pointer">icon</span>
          </div>

          <div className="flex gap-5 items-center">
            <span className="">icon</span>
          </div>

          <div className="flex gap-5 items-center">
            <span className="">icon</span>
          </div>

          <div className="flex gap-5 items-center">
            <span className="">icon</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-between"></div>
    </div>
  );
};

export default SideBar;
