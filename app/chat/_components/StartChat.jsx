"use client";

import { createConversation } from "@/actions/converstion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const StartChat = ({ id, setOpen }) => {
  const [starting, setStarting] = useState(false);
  const router = useRouter();
  return (
    <Button
      size="sm"
      disabled={starting}
      onClick={async () => {
        try {
          setStarting(true);
          const response = await createConversation({ otherUserId: id });
          if (response.error) {
            console.log(response.error);
            toast(response.error);
          }
          toast("Chat Started!");
          setOpen(false);
          router.push(`/chat/${response.id}`);
          // console.log(response.id);
        } catch (error) {
          toast("Something went wrong.");
        } finally {
          setStarting(false);
        }
      }}
    >
      <span className="mr-2">Start Chat</span>{" "}
      {starting && <ClipLoader color="blue" size={20} />}
    </Button>
  );
};

export default StartChat;
