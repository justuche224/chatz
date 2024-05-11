import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";

export async function POST(request) {
  try {
    const user = await currentUser();
    const body = await request.json();
    const { otherUserId, isGroup, members, name } = body;

    if (!user.email || !user.id) {
      console.log("no user at CONVERSATION/ROUTE.JS ");
      //   return new NextResponse("Unauthrised", { status: 401 });
      return NextResponse.json({ error: "Unauthrised" });
    }
    if (!isGroup && !otherUserId) {
      //   return new NextResponse(
      //     "",
      //     { status: 400 }
      //   );
      return NextResponse.json({
        error: "Conversation must be a group or have a another user!",
      });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      //   return new NextResponse("", {
      //     status: 400,
      //   });
      return NextResponse.json({
        error: "Group must have atleast 3 members and a name!",
      });
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
        include: {
          users: true,
        },
      });
      // console.log(newConversation);

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusher.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
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
      // console.log(singleConversation);
      return NextResponse.json(singleConversation);
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
      include: {
        users: true,
      },
    });
    // console.log(newConversation);

    newConversation.users.map((user) => {
      pusher.trigger(user.email, "conversation:new", newConversation);
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error at CONVERSATION/ROUTE.JS", {
      status: 500,
    });
  }
}
