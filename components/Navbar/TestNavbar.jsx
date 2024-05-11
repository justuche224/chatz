"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  FaBell,
  FaFacebookMessenger,
  FaHome,
  FaUserFriends,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { UserButton } from "../auth/UserButton";

const Navbar = () => {
  const currentPath = usePathname();
  return (
    <nav className="w-full flex justify-between px-3 fixed top-0 h-14 items-center bg-secondary shadow-md z-10 ">
      <div>
        <Link href="/" className="flex justify-center items-center gap-2">
          <Image width={40} height={40} alt="logo" src="/images/chatz.svg" />
          <span className="font-bold text-2xl">Chatz</span>
        </Link>
      </div>
      <div>
        <div
          className={
            currentPath === "/register"
              ? "hidden"
              : "flex gap-3 justify-between sm:justify-center w-full fixed bottom-0 left-0 px-5 py-3 sm:py-2 sm:static bg-secondary z-9 "
          }
        >
          <div>
            <Link
              href="/"
              className={currentPath === "/" ? "text-blue-500" : ""}
            >
              <span className="sm:hidden">
                <FaHome className="text-4xl" />
              </span>
              <Button
                className="hidden sm:block"
                variant={currentPath === "/" ? "default" : "outline"}
              >
                Home
              </Button>
            </Link>
          </div>
          <div>
            <Link
              href="/friends"
              className={currentPath === "/friends" ? "text-blue-500" : ""}
            >
              <span className="sm:hidden">
                <FaUserFriends className="text-4xl" />
              </span>
              <Button
                className="hidden sm:block"
                variant={currentPath === "/friends" ? "default" : "outline"}
              >
                Friends
              </Button>
            </Link>
          </div>
          <div>
            <Link
              href="/messages"
              className={currentPath === "/messages" ? "text-blue-500" : ""}
            >
              <span className="sm:hidden">
                <FaFacebookMessenger className="text-4xl" />
              </span>
              <Button
                className="hidden sm:block"
                variant={currentPath === "/messages" ? "default" : "outline"}
              >
                Messages
              </Button>
            </Link>
          </div>
          <div>
            <Link
              href="/notifications"
              className={
                currentPath === "/notifications" ? "text-blue-500" : ""
              }
            >
              <span className="sm:hidden">
                <FaBell className="text-4xl" />
              </span>
              <Button
                className="hidden sm:block"
                variant={
                  currentPath === "/notifications" ? "default" : "outline"
                }
              >
                Notifications
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <UserButton />
      </div>
      {/* <div className="flex justify-center items-center gap-3">
        <Link href="/profile">
          {session?.user ? (
            <ProfilePic user={session.user} />
          ) : (
            <FaUser className="text-2xl" />
          )}
        </Link>
        {sessionStatus === "authenticated" ? (
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
          >
            <FaSignOutAlt className="text-2xl cursor-pointer hover:text-blue-500 transition-all duration-300" />
          </button>
        ) : (
          <Link href="/login">
            <FaSignInAlt className="text-2xl cursor-pointer hover:text-blue-500 transition-all duration-300" />
          </Link>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
