import { currentUser } from "@/lib/auth.js";
import Nav from "./_components/Nav.jsx";
import { getFriends } from "@/actions/getRequests.js";
import { getConversations } from "@/actions/getConversations.js";
import NewChat from "./_components/NewChat.jsx";

const layout = async ({ children }) => {
  const user = await currentUser();
  // console.log(user.id);
  const friends = await getFriends(user.id);
  // console.log(friends);
  const initialConverstions = await getConversations();
  // console.log(initialConverstions);
  return (
    <section className="h-full bg-white dark:bg-black">
      <Nav
        initialConverstions={initialConverstions}
        friends={friends}
        user={user}
      />
      <div className="h-full">{children}</div>
      <NewChat friends={friends} user={user.id} />
    </section>
  );
};

export default layout;
