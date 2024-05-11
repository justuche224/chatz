import { getSentRequests } from "@/actions/getRequests";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const page = async () => {
  const user = await currentUser();
  const requests = await getSentRequests(user.id);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold underline">
        Sent friend requests
      </h1>
      {requests && requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request.addressee.username}
            className="flex flex-col justify-center"
          >
            <div className="flex justify-start gap-5 items-center ml-5">
              <Link href={`/profile/${request.addressee.username}`}>
                {request.addressee.image ? (
                  <div className="overflow-hidden w-[70px] h-[70px] rounded-full">
                    <Image
                      src={request.addressee.image}
                      width={70}
                      height={70}
                      alt={`${request.addressee.firstname} ${request.addressee.lastname}`}
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <FaUser />
                )}
              </Link>
              <div>
                <Link href={`/profile/${request.addressee.username}`}>
                  <h2 className="text-lg font-bold">{`${request.addressee.firstname} ${request.addressee.lastname}`}</h2>
                  <h3 className="text-md text-muted-foreground">
                    @{request.addressee.username}
                  </h3>
                </Link>
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
