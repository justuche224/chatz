"use server";

import { db } from "@/lib/db";

export const getPendingRequests = async (userId) => {
  try {
    const pendingRequests = await db.friendship.findMany({
      where: {
        addresseeId: userId,
        status: "PENDING",
      },
      include: {
        requester: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            image: true,
          },
        }, // Include the details of the requester user
      },
    });
    // console.log(pendingRequests);
    return pendingRequests;
  } catch (error) {
    // console.log(error);
    return { error: "failed to get requests" };
  }
};

export const getSentRequests = async (userId) => {
  try {
    const sentRequests = await db.friendship.findMany({
      where: {
        requesterId: userId,
        status: "PENDING",
      },
      include: {
        addressee: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            image: true,
          },
        }, // Include the details of the addressee user
      },
    });
    // console.log(sentRequests);
    return sentRequests;
  } catch (error) {
    // console.log(error);
    return { error: "failed to get requests" };
  }
};

export const getFriends = async (userId) => {
  try {
    const acceptedFriendships = await db.friendship.findMany({
      where: {
        AND: [
          {
            OR: [{ addresseeId: userId }, { requesterId: userId }],
          },
          { status: "ACCEPTED" },
        ],
      },
      include: {
        requester: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            image: true,
          },
        },
        addressee: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            image: true,
          },
        },
      },
    });
    // console.log(acceptedFriendships);
    return acceptedFriendships;
  } catch (error) {
    console.error(error);
    return { error: "Failed to get friends" };
  }
};
