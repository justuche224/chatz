import { FaPlus } from "react-icons/fa";
import DesktopChatlist from "./_components/DesktopChatlist";
import MobileChatlist from "./_components/MobileChatlist";
import { getFriends } from "@/actions/getRequests";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

const layout = async ({ children }) => {
  const user = await currentUser();
  // console.log(user);
  const friends = await getFriends(user.id);
  // console.log(friends);
  return (
    <main className="fixed w-full h-screen flex flex-col lg:flex-row bg-gray-100 dark:bg-[#2c2c2c]">
      <MobileChatlist friends={friends} user={user.id} />
      <DesktopChatlist friends={friends} user={user.id} />
      <section className="w-full lg:w-[65%] h-full">{children}</section>
      <Link href="/chat/new">
        <div className="absolute w-12 h-12 bg-destructive rounded-full bottom-16 left-5 grid place-content-center">
          <FaPlus />
        </div>
      </Link>
    </main>
  );
};

export default layout;
