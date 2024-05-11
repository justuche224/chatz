"use client";

import { IoIosCloseCircle } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import { LuUsers2 } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

function AnotherNav({ setIsOpen, isOpen }) {
  const router = useRouter();
  const currentPath = usePathname();
  const stopEvent = (e) => {
    e.stopPropagation;
  };
  return (
    <>
      <button>
        <FaBarsStaggered
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          id="menu-container"
          className="w-full min-h-screen bg-[#000000b4] fixed top-0 left-0 backdrop-blur-lg md:hidden"
        >
          <button className="z-[999]">
            <IoIosCloseCircle className="absolute top-1 right-1 text-5xl text-destructive" />
          </button>

          <div
            onClick={stopEvent}
            id="menu"
            className="flex flex-col fixed top-0 gap-5 justify-between w-[80%] sm:w-[70%] min-h-[100vh] max-h-[100vh] overflow-y-auto dark:bg-black dark:text-white bg-gray-200 p-5 shadow-md"
          >
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold flex flex-col gap-3">
                <div
                  onClick={() => router.push("/friends")}
                  className={`flex gap-5 items-center cursor-pointer ${
                    currentPath === "/friends" ? "text-destructive" : ""
                  }`}
                >
                  <span className="">
                    <LuUsers2 />
                  </span>

                  <span className="">Friends</span>
                </div>

                <div className="flex gap-5 items-center">
                  <span className="">icon</span>

                  <span className="">text</span>
                </div>

                <div className="flex gap-5 items-center">
                  <span className="">icon</span>

                  <span className="">text</span>
                </div>

                <div className="flex gap-5 items-center">
                  <span className="">icon</span>

                  <span className="">text</span>
                </div>

                <div className="flex gap-5 items-center">
                  <span className="">icon</span>

                  <span className="">text</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 justify-between"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnotherNav;
