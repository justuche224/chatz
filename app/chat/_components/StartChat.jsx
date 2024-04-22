"use client";

import { createConversation } from "@/actions/converstion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StartChat = ({ id }) => {
  const router = useRouter();
  const prop = {
    otherUserId: id,
  };
  return (
    <button
      onClick={async () => {
        const response = await createConversation(prop);
        if (response.error) {
          console.log(response.error);
          toast(response.error);
        }
        toast(response.success);
        console.log(response.conversationId);
      }}
    >
      StartChat
    </button>
  );
};

export default StartChat;
