import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const createConversation = async (
  otherUserId,
  isGroup,
  members,
  name
) => {
  try {
    const user = await currentUser();

    if (!user?.id || !user?.email) {
      return { error: "Unauthorised" };
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return { error: "Invalid Data" };
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
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

      return newConversation;
    }

    const existingConversation = await db.conversation.findMany({
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

    const singleConversation = existingConversation[0];

    if (singleConversation) {
      return singleConversation;
    }
    const newConversation = await db.conversation.create({
      data: {
        users: {
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

    return newConversation;
  } catch (error) {
    console.log(error);
    return { error: "Sommething went wrong!" };
  }
};
