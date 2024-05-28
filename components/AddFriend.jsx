"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { addFriend } from "@/actions/addFriend";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

function AddFriend({ requesterId, addresseeUsername }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <Button
      onClick={async () => {
        try {
          setAdding(true);
          const result = await addFriend(requesterId, addresseeUsername);

          if (result.error) {
            toast(result.error);
          }

          setAdded(true);
          toast(result.success);
        } catch (error) {
          toast("Something went wrong");
        } finally {
          setAdding(false);
        }
      }}
      variant="destructive"
      className="my-3"
      disabled={adding || added}
    >
      <span className="mr-2">{added ? "Request sent" : "Add Friend"}</span>{" "}
      {adding && <ClipLoader color="blue" size={20} />}
    </Button>
  );
}

export default AddFriend;
