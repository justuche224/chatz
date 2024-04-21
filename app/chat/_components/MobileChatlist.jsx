"use client";

import { usePathname } from "next/navigation";
import ChatList from "./ChatList";

function MobileChatlist() {
  const pathname = usePathname();

  return (
    <section
      className={
        pathname === "/chat"
          ? "w-full lg:hidden h-full bg-[#f7f5f5] dark:bg-[#2c2c2c] lg:w-[35%]"
          : "hidden"
      }
    >
      <ChatList />
    </section>
  );
}

export default MobileChatlist;
