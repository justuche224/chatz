"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "./logout-button";
import { ExitIcon, EnterIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FaUser, FaUserPlus } from "react-icons/fa";
import LoginButton from "./login-button";
import RegisterButton from "./register-button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  const getFirstTwoLetters = () => {
    return user?.username.slice(0, 2).toUpperCase();
  };

  function shortenString(str) {
    if (str.length > 11) {
      return str.slice(0, 8) + "...";
    } else {
      return str;
    }
  }

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              <span className="w-[60px] h-[60px] font-bold bg-destructive text-center flex justify-center items-center p-2 rounded-full">
                <FaUser className="text-3xl" />
              </span>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <LoginButton>
            <DropdownMenuItem>
              <EnterIcon className="w-4 h-4 mr-2" />
              {""}Login
            </DropdownMenuItem>
          </LoginButton>
          <RegisterButton>
            <DropdownMenuItem>
              <FaUserPlus className="w-4 h-4 mr-2" />
              {""}Join
            </DropdownMenuItem>
          </RegisterButton>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <span className="w-[60px] h-[60px] text-2xl font-bold bg-destructive text-center flex justify-center items-center p-2 rounded-full">
              {getFirstTwoLetters()}
            </span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>
          {user.image ? (
            <Link href="/profile" className="mx-auto">
              <Image src={user.image} alt="Profile" width={100} height={100} />
            </Link>
          ) : (
            <div className=" font-extrabold text-[4rem] w-full grid place-content-center bg-primary-500 rounded-full text-center hover:bg-primary-600">
              <Link href="/profile">
                <span className="w-[100px] h-[100px] bg-secondary text-center flex justify-center items-center p-2 rounded-full">
                  {getFirstTwoLetters()}
                </span>
              </Link>
            </div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/profile">
            <h2 className="text-center font-bold text-xl underline">
              {shortenString(user?.username)}
            </h2>
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="w-4 h-4 mr-2" />
            {""}Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
