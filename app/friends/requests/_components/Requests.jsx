"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import AcceptButton from "./AcceptButton";
import { useState } from "react";

const Requests = ({ requests }) => {
  const [testing, setTesting] = useState(["accepted goes here"]);

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold underline">
        Pending friend requests
      </h1>
      {requests && requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request.requester.username}
            className="flex flex-col justify-center w-full border border-destructive my-2"
          >
            <div className="flex justify-between gap-5 items-center p-2">
              <Link
                href={`/profile/${request.requester.username}`}
                className="flex gap-3"
              >
                {request.requester.image ? (
                  <div className="overflow-hidden w-[70px] h-[70px] rounded-full">
                    <Image
                      src={request.requester.image}
                      width={70}
                      height={70}
                      alt={`${request.requester.firstname} ${request.requester.lastname}`}
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <FaUser size={60} />
                )}
                <div>
                  <h2 className="text-lg font-bold">{`${request.requester.firstname} ${request.requester.lastname}`}</h2>
                  <h3 className="text-md text-muted-foreground">
                    @{request.requester.username}
                  </h3>
                </div>
              </Link>
              <div className="flex flex-col items-start">
                <div className="flex justify-end items-center">
                  <AcceptButton
                    id={request.id}
                    testing={testing}
                    setTesting={setTesting}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No pending requests</p>
      )}
    </div>
  );
};

export default Requests;
