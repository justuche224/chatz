"use client";

// import { createConversation } from "@/actions/converstion";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
          //const response = await createConversation({ otherUserId: id });
          const response = await axios.post("/api/conversations", {
            otherUserId: id,
          });
          // console.log(response.data);
          // return;
          if (response.data.error) {
            // console.log(response.error);
            toast(response.data.error);
          }
          toast("Chat Started!");
          console.log(response.data.id);
          setOpen(false);
          router.push(`/chat/${response.data.id}`);
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
