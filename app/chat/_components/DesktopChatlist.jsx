import ConversationList from "./ConversationList";

function DesktopChatlist({ friends, user }) {
  return (
    <section className="w-full hidden h-full lg:block bg-[#f7f5f5] dark:bg-[#2c2c2c] lg:w-[35%]">
      <ConversationList friends={friends} user={user} />
    </section>
  );
}

export default DesktopChatlist;
