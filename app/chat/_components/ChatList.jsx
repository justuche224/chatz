"use client";

import { usePathname } from "next/navigation";
import ChatItem from "./ChatItem";

const ChatList = () => {
  const pathname = usePathname();
  return (
    <ul className="w-full flex flex-col gap-1 p-2 h-full">
      <li>
        <ChatItem />
      </li>
      <li>
        <ChatItem />
      </li>
      <li>
        <ChatItem />
      </li>
    </ul>
  );
};

export default ChatList;
