"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const getConversatiponById = async (conversationId) => {
  try {
    const user = currentUser();

    if (!(await user).email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
