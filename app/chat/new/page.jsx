import { currentUser } from "@/lib/auth";
import ChatList from "../_components/ChatList";
import { getFriends } from "@/actions/getRequests";

const page = async () => {
  const user = await currentUser();
  const friends = await getFriends(user.id);
  // console.log(friends);
  // console.log(user);

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center">Select a contact to chat</h1>
      <div>
        hi
        <ChatList user={user} friends={friends} />
      </div>
    </div>
  );
};

export default page;
