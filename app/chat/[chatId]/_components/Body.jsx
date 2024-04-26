"use client";

import useConversation from "@/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import axios from "axios";

const Body = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);

  const { chatId } = useConversation;

  useEffect(() => {
    axios.post(`/api/conversations/${chatId}/seen`);
  }, [chatId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageItem
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default Body;
