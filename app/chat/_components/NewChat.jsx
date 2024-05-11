"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import NewChatList from "./NewChatList";
import { usePathname } from "next/navigation";

const NewChat = ({ friends, user }) => {
  // console.log(user);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <section className="min-h-screen w-full fixed left-0 top-0 bg-[#0000007e] z-[997] flex flex-col justify-center items-center backdrop-blur-lg">
          <Card className="w-[350px] xs:w-[400px] sm:w-[500px] shadow-md flex flex-col justify-center items-center">
            <CardHeader>
              <h1 className="font-bold text-3xl">New Chat</h1>
              <h1 className="font-semibold text-lg text-muted-foreground">
                Select a contact!
              </h1>
            </CardHeader>
            <CardContent>
              <div className="w-[350px] h-[250px] p-2 overflow-y-auto">
                <NewChatList friends={friends} user={user} setOpen={setOpen} />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setOpen(!open)}
              >
                Close
              </Button>
            </CardFooter>
          </Card>
        </section>
      )}
      {pathname === `/chat` ? (
        <div
          className="
            absolute 
            w-12 
            h-12 bg-red-500 
            rounded-full 
            bottom-16 
            left-5
            grid 
            place-content-center 
            hover:opacity-85 
            cursor-pointer
            z-[999]
            "
        >
          <FaPlus onClick={() => setOpen(!open)} />
        </div>
      ) : null}
    </>
  );
};

export default NewChat;
