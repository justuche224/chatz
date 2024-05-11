"use client";

import { usePathname } from "next/navigation";
import ChatList from "./ChatList.jsx";

const Nav = ({ friends, user, initialConverstions }) => {
  const pathname = usePathname();
  return (
    <>
      <nav
        aria-label="Chat List"
        className="
                    hidden
                    md:block
                    md:w-72
                    h-full
                    md:fixed
                    md:left-12
                    md:border-r
                    md:px-2
                  "
      >
        <input type="text" className="w-full" placeholder="search chats" />
        <ChatList
          friends={friends}
          user={user}
          initialConverstions={initialConverstions}
        />
      </nav>
      <nav
        aria-label="Chat List"
        className={pathname === "/chat" ? "md:hidden h-full" : "hidden"}
      >
        <input type="text" className="w-full" placeholder="search chats" />
        <ChatList
          friends={friends}
          user={user}
          initialConverstions={initialConverstions}
        />
      </nav>
    </>
  );
};

export default Nav;
