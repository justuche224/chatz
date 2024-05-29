"use server";

import { db } from "@/lib/db";

export const getComments = async (postId) => {
  console.log(postId);
  try {
    const comments = await db.comment.findMany({
      where: {
        postId,
        isTop: true, //fetch only top level comments
      },
      include: {
        replies: true,
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
    });
    // console.log(comments);
    return comments;
  } catch (error) {
    console.log(error, "getComments");
  }
};
