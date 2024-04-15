import { getFriends } from "@/actions/getRequests";
import { currentUser } from "@/lib/auth";

const page = async () => {
  const user = await currentUser();
  const friends = await getFriends(user.id);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold underline">Friends</h1>
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend.id}>
            <p>
              Name: {friend.requester.firstname} {friend.requester.lastname}
            </p>
            <p>Username: {friend.requester.username}</p>
            <button>Accept</button>
          </div>
        ))
      ) : (
        <p className="text-center">
          No friends: chatz is better with friends, add friends to connect!
        </p>
      )}
    </div>
  );
};

export default page;
