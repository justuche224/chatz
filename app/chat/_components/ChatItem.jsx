"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import { useOthetUser } from "@/hooks/useOtherUser";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { format } from "date-fns";
import clsx from "clsx";

const ChatItem = ({ data }) => {
  // console.log(data);
  const otherUser = useOthetUser(data);

  // console.log(otherUser);

  const user = useCurrentUser();

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  // console.log(lastMessage);
  const userEmail = useMemo(() => {
    return user?.email;
  }, [user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage?.body, lastMessage?.image]);

  return (
    <Link href={`/chat/${data.id}`}>
      <div className="flex gap-2  p-4 justify-between items-center text-2xl">
        <div className="flex gap-4">
          <div className="w-11 h-11 bg-green-400 rounded-full"></div>
          <div>
            <h1 className="font-bold text-xl md:text-sm">
              {data?.name || otherUser?.firstname + " " + otherUser?.lastname}
            </h1>
            <p
              className={clsx(
                `truncate text-xs`,
                hasSeen ? "text-gray-500" : "font-medium"
              )}
            >
              {lastMessageText}
            </p>
          </div>
        </div>
        <div>
          {lastMessage?.createdAt && (
            <p className="md:text-sm">
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
