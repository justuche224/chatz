import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";

export async function POST(request) {
  try {
    const user = await currentUser();
    const body = await request.json();
    const { postId } = body;

    if (!user.email || !user.id) {
      console.log("no user at POSTS/[LIKE]/ROUTE.JS ");
      throw new Error("Unauthorised");
    }

    // Check if the user already likes the post
    const existingLike = await db.like.findFirst({
      where: {
        userId: user.id,
        postId: postId,
      },
    });

    if (existingLike) {
      // Delete the existing like
      await db.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Notify clients via Pusher that the like has been removed
      await pusher.trigger(postId, "likes:removed", existingLike);

      return NextResponse.json({ message: "Post unliked" });
    }

    // If the like doesn't exist, create a new like
    const newLike = await db.like.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            image: true,
            firstname: true,
            lastname: true,
            username: true,
            email: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                image: true,
                firstname: true,
                lastname: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Notify clients via Pusher that a new like has been added
    await pusher.trigger(postId, "likes:new", newLike);

    return NextResponse.json({ message: "Post liked" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
