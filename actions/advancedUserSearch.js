"use server";

import { db } from "@/lib/db";

export const advancedSearchUsers = async (search, user) => {
  try {
    const users = await db.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: user, // Exclude the user ID from the results
            },
          },
          {
            OR: [
              { firstname: { contains: search, mode: "insensitive" } },
              { lastname: { contains: search, mode: "insensitive" } },
              {
                AND: [
                  {
                    firstname: {
                      contains: search.split(" ")[0],
                      mode: "insensitive",
                    },
                  },
                  {
                    lastname: {
                      contains: search.split(" ")[1],
                      mode: "insensitive",
                    },
                  },
                ],
              },
              { username: { contains: search, mode: "insensitive" } },
            ],
          },
        ],
      },
      select: {
        firstname: true,
        lastname: true,
        username: true,
        image: true,
        sentRequests: {
          select: {
            status: true,
            addresseeId: true,
          },
        },
        receivedRequests: {
          select: {
            status: true,
            requesterId: true,
          },
        },
      },
    });

    // Separate users based on friendship status
    const friends = [];
    const pending = [];
    const blocked = [];
    const noFriendship = [];

    users.forEach((user) => {
      if (
        user.sentRequests.length === 0 &&
        user.receivedRequests.length === 0
      ) {
        noFriendship.push(user);
      } else {
        user.sentRequests.forEach((request) => {
          if (request.status === "ACCEPTED") {
            friends.push(user);
          } else if (request.status === "PENDING") {
            pending.push(user);
          } else if (request.status === "BLOCKED") {
            blocked.push(user);
          }
        });

        user.receivedRequests.forEach((request) => {
          if (request.status === "ACCEPTED") {
            friends.push(user);
          } else if (request.status === "PENDING") {
            pending.push(user);
          } else if (request.status === "BLOCKED") {
            blocked.push(user);
          }
        });
      }
    });
    return { friends, pending, noFriendship };
  } catch (error) {
    console.log(error);
    return null;
  }
};
