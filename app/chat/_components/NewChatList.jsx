import NewChatItem from "./NewChatItem";

const NewChatList = ({ friends, user, setOpen }) => {
  // console.log(user);
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
            <NewChatItem
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

export default NewChatList;
