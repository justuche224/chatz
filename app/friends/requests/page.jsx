import { getPendingRequests } from "@/actions/getRequests";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const page = async () => {
  const user = await currentUser();
  const requests = await getPendingRequests(user.id);

  const handleAccept = async (requestId) => {
    console.log("accepted");
    // Implement accept request logic here
    // await acceptFriendRequest(requestId); // Assuming this function accepts a requestId and performs the action
    // You may want to refresh the requests after accepting one
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold underline">
        Pending friend requests
      </h1>
      {requests && requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request.requester.username}
            className="flex flex-col justify-center"
          >
            <div className="flex justify-start gap-5 items-center ml-5">
              <Link href={`/profile/${request.requester.username}`}>
                {request.requester.image ? (
                  <Image
                    src={request.requester.image}
                    width={70}
                    height={70}
                    alt={`${request.requester.firstname} ${request.requester.lastname}`}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <FaUser />
                )}
              </Link>
              <div>
                <Link href={`/profile/${request.requester.username}`}>
                  <h2 className="text-lg font-bold">{`${request.requester.firstname} ${request.requester.lastname}`}</h2>
                  <h3 className="text-md text-muted-foreground">
                    @{request.requester.username}
                  </h3>
                </Link>
                <div className="flex justify-end items-center">
                  <Button size="sm" variant="secondary">
                    <span className="mr-2">Accept</span>
                  </Button>
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

export default page;
