"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import clsx from "clsx";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { format } from "date-fns";

const MessageItem = ({ data, isLast }) => {
  const user = useCurrentUser();

  const isOwn = user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.firstname)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-start");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-red-500 text-white" : "bg-blue-500",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        {data.sender.image ? (
          <div className="overflow-hidden w-[70px] h-[70px] rounded-full">
            <Image
              src={data.sender.image}
              width={70}
              height={70}
              alt={`${data.sender.firstname} ${data.sender.lastname}`}
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <FaUser size={30} />
        )}
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm">
            {`${data.sender.firstname} ${data.sender.lastname}`}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt="image"
              height={288}
              width={288}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light italic">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
