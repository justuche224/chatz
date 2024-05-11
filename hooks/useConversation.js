import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const chatId = useMemo(() => {
    if (!params?.chatId) {
      return "";
    }
    return params?.chatId;
  }, [params?.chatId]);

  const isOpen = useMemo(() => !!chatId, [chatId]);

  return useMemo(() => ({ isOpen, chatId }), [isOpen, chatId]);
};

export default useConversation;
