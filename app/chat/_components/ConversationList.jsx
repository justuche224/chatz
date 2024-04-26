"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ friends, user, initialConverstions }) => {
  const currentPath = usePathname();
  const [items, setItem] = useState(initialConverstions);

  return (
    <ul className="w-full flex flex-col gap-1 p-2 h-full">
      {items.map((item) => (
        <li
          key={item.id}
          className={
            currentPath === `/chat/${item.id}`
              ? "bg-gray-200 dark:bg-[#424242] "
              : "bg-[#f7f5f5] dark:bg-[#2c2c2c]"
          }
        >
          <ConversationItem data={item} />
        </li>
      ))}
    </ul>
  );
};

export default ConversationList;
