import { getFriends } from "@/actions/getRequests";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const page = async () => {
  const user = await currentUser();
  const friends = await getFriends(user.id);

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold underline">Friends</h1>
      {friends && friends.length > 0 ? (
        friends.map((friend) => {
          const isUserRequester = friend.requesterId === user.id;
          const otherParty = isUserRequester
            ? friend.addressee
            : friend.requester;
          // console.log(isUserRequester);
          return (
            <div
              key={friend.id}
              className="flex flex-col justify-center w-full border border-destructive my-2"
            >
              <div className="flex justify-between gap-5 items-center p-2">
                <div className="flex gap-3">
                  {otherParty.image ? (
                    <div className="overflow-hidden w-[70px] h-[70px] rounded-full">
                      <Image
                        src={otherParty.image}
                        width={70}
                        height={70}
                        alt={`${otherParty.firstname} ${otherParty.lastname}`}
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <FaUser size={60} />
                  )}
                  <div>
                    <h2 className="text-lg font-bold">{`${otherParty.firstname} ${otherParty.lastname}`}</h2>
                    <h3 className="text-md text-muted-foreground">
                      @{otherParty.username}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex justify-end items-center">
                    <Link href={`/profile/${otherParty.username}`}>
                      <Button size="sm">View profile</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center">
          No friends: chatz is better with friends, add friends to connect!
        </p>
      )}
    </div>
  );
};

export default page;
