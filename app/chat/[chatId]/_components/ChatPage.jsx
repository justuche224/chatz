"use client";

import Header from "./Header";
import Body from "./Body";
import Form from "./Form";
import { useState } from "react";

function ChatPage({ conversation, initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [sending, setSending] = useState(false);
  return (
    <>
      <Header conversation={conversation} />
      <Body messages={messages} setMessages={setMessages} sending={sending} />
      <Form
        messages={messages}
        setMessages={setMessages}
        setSending={setSending}
      />
    </>
  );
}

export default ChatPage;
