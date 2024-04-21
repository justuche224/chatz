import Link from "next/link";

const ChatItem = () => {
  return (
    <Link href="/chat/486835">
      <div className="flex gap-2 bg-[#f7f5f5] dark:bg-[#2c2c2c] p-4 justify-between items-center">
        <div className="flex gap-4">
          <div className="w-11 h-11 bg-red-400 rounded-full"></div>
          <div>
            <h1 className="font-bold text-xl">Precious CBS</h1>
            <p>last message</p>
          </div>
        </div>
        <div>
          <h1>Yesterday</h1>
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
