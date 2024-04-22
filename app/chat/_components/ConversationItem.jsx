import Link from "next/link";

const ConversationItem = ({ id, firstname, lastname, username, image }) => {
  return (
    <Link href={`/chat/${id}`}>
      <div className="flex gap-2 bg-[#f7f5f5] dark:bg-[#2c2c2c] p-4 justify-between items-center">
        <div className="flex gap-4">
          <div className="w-11 h-11 bg-green-400 rounded-full"></div>
          <div>
            <h1 className="font-bold text-xl">{firstname + " " + lastname}</h1>
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

export default ConversationItem;
