"uer server";

import { db } from "@/lib/db";

export const getMessages = async (conversationId) => {
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    // console.log(messages);
    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
};
