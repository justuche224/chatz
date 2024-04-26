import { getConversatiponById } from "@/actions/getConversationById";
import ChatPage from "../_components/ChatPage";
import { getMessages } from "@/actions/getMessages";
import Header from "./_components/Header";
import Body from "./_components/Body";
import Form from "./_components/Form";

const page = async ({ params }) => {
  const conversation = await getConversatiponById(params.chatId);
  const messages = await getMessages(params.chatId);

  // console.log(conversation);
  // console.log(messages);
  if (!conversation) {
    return (
      <div className="bg-gray-200 dark:bg-[#424242] h-full w-full text-4xl flex justify-center items-center"></div>
    );
  }
  return (
    <div className="h-full">
      {/* <ChatPage /> */}
      <div className="bg-gray-200 dark:bg-[#424242] h-full w-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default page;
