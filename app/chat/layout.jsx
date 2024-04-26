import { FaPlus } from "react-icons/fa";
import DesktopChatlist from "./_components/DesktopChatlist";
import MobileChatlist from "./_components/MobileChatlist";
import { getFriends } from "@/actions/getRequests";
import { currentUser } from "@/lib/auth";
import Link from "next/link";
import { getConversations } from "@/actions/getConversations";
import NewChat from "./_components/NewChat";

const layout = async ({ children }) => {
  const user = await currentUser();
  // console.log(user);
  const friends = await getFriends(user.id);
  // console.log(friends);
  const initialConverstions = await getConversations();
  // console.log(initialConverstions);
  return (
    <main className="w-full h-[93vh] fixed flex flex-col lg:flex-row bg-gray-100 dark:bg-[#2c2c2c]">
      <MobileChatlist
        initialConverstions={initialConverstions}
        friends={friends}
        user={user.id}
      />
      <DesktopChatlist
        initialConverstions={initialConverstions}
        friends={friends}
        user={user.id}
      />
      <section className="w-full lg:w-[65%] h-full">{children}</section>
      <NewChat friends={friends} user={user.id} />
    </main>
  );
};

export default layout;
