"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { find } from "lodash";
import { pusherClient } from "@/lib/pusher";
import ChatItem from "./ChatItem";

const ChatList = ({ friends, user, initialConverstions }) => {
  const currentPath = usePathname();
  const [items, setItems] = useState(initialConverstions);

  useEffect(() => {
    if (!user.email) {
      return;
    }
    pusherClient.subscribe(user.email);

    const newHandler = (conversation) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);

    return () => {
      pusherClient.unsubscribe(user.email);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
    };
  }, [user.email]);

  return (
    <div className="px-3 md:px-0">
      <input
        type="text"
        className="my-2 py-2 px-4 bg-neutral-300 text-black w-full rounded-full focus:outline-none"
        placeholder="search chats"
      />
      <ul className="w-full mt-5 h-full">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              currentPath === `/chat/${item.id}`
                ? "bg-white dark:bg-gray-900 rounded-lg"
                : "hover:bg-white hover:dark:bg-gray-900 hover:rounded-lg transition-colors"
            }
          >
            <ChatItem data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
