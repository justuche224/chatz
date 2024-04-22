"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

// export const createConversation = async (
//   otherUserId,
//   isGroup,
//   members,
//   name
// ) => {
export const createConversation = async (prop) => {
  const { otherUserId, isGroup, members, name } = prop;
  try {
    const user = await currentUser();

    if (!user?.id || !user?.email) {
      return { error: "Unauthorised" };
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return { error: "Invalid Data" };
    }
    console.log("1");
    if (isGroup) {
      const newConversation = await db.conversations.create({
        data: {
          name,
          isGroup,
          userIds: {
            connect: [
              ...members.map((member) => ({
                id: member.value,
              })),
              {
                id: user.id,
              },
            ],
          },
        },
      });

      return {
        success: "Group chat created!",
        conversationId: newConversation.id,
      };
    }
    console.log("2");

    const existingConversation = await db.conversations.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [user.id, otherUserId],
            },
          },
          {
            userIds: {
              equals: [otherUserId, user.id],
            },
          },
        ],
      },
    });
    console.log("3");

    const singleConversation = existingConversation?.[0];
    console.log(singleConversation);

    if (singleConversation) {
      return {
        success: "Chat created!",
        conversationId: singleConversation.id,
      };
    }
    console.log("4");

    const newConversation = await db.conversations.create({
      data: {
        userIds: {
          connect: [
            {
              id: user.id,
            },
            {
              id: otherUserId,
            },
          ],
        },
      },
    });
    console.log("5");

    return { success: "Chat created!", conversationId: newConversation.id };
  } catch (error) {
    console.log(error);
    return { error: "Sommething went wrong!" };
  }
};
