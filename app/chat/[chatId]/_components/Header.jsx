"use client";

import { useOthetUser } from "@/hooks/useOtherUser";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

const Header = ({ conversation }) => {
  const otherUser = useOthetUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div className="w-full flex border-b sm:px-4 md:pr-20 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href="/chat"
          className="lg:hidden block text-destructive hover:text-destructive-foreground"
        >
          <HiChevronLeft size={32} />
        </Link>
        {otherUser.image ? (
          <div className="overflow-hidden w-[70px] h-[70px] rounded-full">
            <Image
              src={otherUser.image}
              width={70}
              height={70}
              alt={`${otherUser.firstname} ${otherUser.lastname}`}
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <FaUser size={30} />
        )}
        <div className="flex flex-col">
          <div className="">
            {conversation.name ||
              otherUser?.firstname + " " + otherUser?.lastname}
          </div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className=" text-destructive"
      />
    </div>
  );
};

export default Header;
