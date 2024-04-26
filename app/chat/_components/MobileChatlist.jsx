"use client";

import { usePathname } from "next/navigation";
import ConversationList from "./ConversationList";

function MobileChatlist({ friends, user, initialConverstions }) {
  const pathname = usePathname();

  return (
    <section
      className={
        pathname === "/chat"
          ? "w-full lg:hidden h-full bg-[#f7f5f5] dark:bg-[#2c2c2c] lg:w-[35%]"
          : "hidden"
      }
    >
      <ConversationList
        friends={friends}
        user={user}
        initialConverstions={initialConverstions}
      />
    </section>
  );
}

export default MobileChatlist;
