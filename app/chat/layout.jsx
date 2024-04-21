import DesktopChatlist from "./_components/DesktopChatlist";
import MobileChatlist from "./_components/MobileChatlist";

const layout = async ({ children }) => {
  return (
    <main className="w-full h-screen flex flex-col lg:flex-row bg-gray-100 dark:bg-[#2c2c2c]">
      <MobileChatlist />
      <DesktopChatlist />
      <section className="w-full lg:w-[65%] h-full">{children}</section>
    </main>
  );
};

export default layout;
