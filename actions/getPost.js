import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getPost = async (id) => {
  try {
    const user = await currentUser();

    if (!user.email || !user.id) {
      return { error: "Unauthorized!" };
    }

    // Retrieve the post
    const post = await db.post.findUnique({
      where: { id },
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
      },
    });

    if (!post) {
      return { error: "Post not found!" };
    }

    // Check if the current user is friends with the poster
    const isFriend = await db.friendship.findFirst({
      where: {
        OR: [
          {
            requesterId: user.id,
            addresseeId: post.user.id,
            status: "ACCEPTED",
          },
          {
            requesterId: post.user.id,
            addresseeId: user.id,
            status: "ACCEPTED",
          },
        ],
      },
    });

    if (!isFriend) {
      return {
        error: "Unauthorized! You are not friends with the post creator.",
      };
    }

    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};
