import ChatList from "./ChatList";

function DesktopChatlist() {
  return (
    <section className="w-full hidden h-full lg:block bg-[#f7f5f5] dark:bg-[#2c2c2c] lg:w-[35%]">
      <ChatList />
    </section>
  );
}

export default DesktopChatlist;
