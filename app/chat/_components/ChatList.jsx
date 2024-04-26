import ChatItem from "./ChatItem";

const ChatList = ({ friends, user, setOpen }) => {
  if (!friends) return null; // Handle case where friends is not yet loaded

  return (
    <ul className="w-full flex flex-col gap-1 p-2 h-full">
      {friends.map((friend) => {
        // Determine if the user is the requester or the addressee
        const isUserRequester = friend.requesterId === user;
        const otherParty = isUserRequester
          ? friend.addressee
          : friend.requester;

        return (
          <li key={otherParty.id}>
            <ChatItem
              id={otherParty.id}
              firstname={otherParty.firstname}
              lastname={otherParty.lastname}
              username={otherParty.username}
              image={otherParty.image}
              setOpen={setOpen}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
