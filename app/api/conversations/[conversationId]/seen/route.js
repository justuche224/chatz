import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusher } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const user = await currentUser();
    const { conversationId } = params;

    if (!user.id || !user.email) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await pusher.trigger(user.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(user.id) === -1) {
      return NextResponse.json(conversation);
    }

    await pusher.trigger(conversationId, "message:update", updatedMessage);

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "MESSAGES_SEEN_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
