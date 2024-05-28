"use client";

import useConversation from "@/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { ClipLoader } from "react-spinners";

const Body = ({ messages, setMessages, sending }) => {
  // const [messages, setMessages] = useState(initialMessages);
  // console.log(messages);
  const bottomRef = useRef(null);

  const { chatId } = useConversation();
  // console.log(chatId);
  useEffect(() => {
    axios.post(`/api/conversations/${chatId}/seen`);
  }, [chatId]);

  useEffect(() => {
    pusherClient.subscribe(chatId);

    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message) => {
      axios.post(`/api/conversations/${chatId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };
    //TODO add read
    // const updateMessageHandler = (newMessage) => {
    //   setMessages((current) => current.map((currentMessage)=>{
    //     if (currentMessage.id === newMessage.id) {
    //       return newMessage
    //     }
    //     return currentMessage
    //   }))
    // };

    const updateMessageHandler = () => {};

    pusherClient.bind("message:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("message:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [chatId, setMessages]);
  // console.log(messages, "wow");
  return (
    <div className="flex-1 overflow-y-auto md:pr-20 lg:pr-0">
      {messages.map((message, i) => (
        <MessageItem
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      {sending && (
        <p className="text-center flex justify-center items-center gap-3 text-md italic fixed bottom-[5.5rem] left-[45%] md:left-[60%] bg-red-500 p-2 rounded-full">
          <span>sending</span> <ClipLoader color="blue" size={20} />
        </p>
      )}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default Body;
