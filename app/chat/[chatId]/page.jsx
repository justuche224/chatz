import { getConversatiponById } from "@/actions/getConversationById";
import { getMessages } from "@/actions/getMessages";
import { currentUser } from "@/lib/auth";
import Header from "./_components/Header";
import Form from "./_components/Form";
import Body from "./_components/Body";

const page = async ({ params }) => {
  const user = await currentUser();
  // console.log(user);
  const conversation = await getConversatiponById(params.chatId);

  if (!conversation) {
    return <div className="h-full md:ml-72"></div>;
  }

  // Check if the current user is part of the conversation
  const isUserInConversation = conversation.userIds.includes(user.id);
  if (!isUserInConversation) {
    return (
      <div className="h-full md:ml-72 text-center">
        <h1 className="font-bold text-center text-red-500 text-4xl">
          You are not authorized to view this conversation!
        </h1>
      </div>
    );
  }

  const messages = await getMessages(params.chatId);
  // console.log(messages, "this one");
  return (
    <div
      id="chat-page"
      className="fixed w-full md:w-[calc(100%-288px)] lg:w-[calc(100%-340px)] md:ml-72 flex flex-col bg-light-chat dark:bg-dark-chat bg-cover"
    >
      <Header conversation={conversation} />
      <Body initialMessages={messages} />
      <Form />
    </div>
  );
};

export default page;
