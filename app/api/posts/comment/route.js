import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";
//TODO remember validations
export async function POST(request) {
  try {
    const user = await currentUser();
    // console.log(user.id);
    const body = await request.json();
    const { content, userId, postId, parentId } = body;
    // console.log(parentId);
    // return NextResponse.json({ message: "Comment added" });

    if (!user.email || !user.id) {
      console.log("no user at POSTS/[COMMENT]/ROUTE.JS ");
      throw new Error("Unauthorised: no user");
    }

    if (user.id !== userId) {
      console.log("no user at POSTS/[COMMENT]/ROUTE.JS ");
      throw new Error("Unauthorised: id dosent match");
    }
    if (parentId) {
      const newComment = await db.comment.create({
        data: {
          content,
          isTop: false,
          parent: {
            connect: {
              id: parentId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: userId,
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

      // await pusher.trigger(postId, "likes:new", newLike);
      //   console.log(newComment);
      return NextResponse.json({ message: "Comment added", newComment });
    }
    const newComment = await db.comment.create({
      data: {
        content,
        isTop: true,
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
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

    // await pusher.trigger(postId, "likes:new", newLike);

    return NextResponse.json({ message: "Comment added", newComment });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
