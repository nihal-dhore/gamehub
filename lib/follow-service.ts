import { authOptions } from "@/app/api/auth/libs/auth";
import { Session, getServerSession } from "next-auth";
import { db } from "@/lib/db";

export const getFollowedUsers = async () => {
  try {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized access");
    }

    const users = await db.follow.findMany({
      where: {
        followerId: session.user.id,
        following: {
          Blocking: {
            none: {
              blockedId: session.user.id
            }
          }
        }
      },
      include: {
        following: true
      }
    });

    return users;
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const session: Session | null = await getServerSession(authOptions);

    const otherUser = await db.user.findUnique({
      where: {
        id
      }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === session?.user.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: session?.user.id,
        followingId: otherUser.id
      }
    });
    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized request");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === session.user.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: session.user.id,
      followingId: otherUser.id
    }
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: session.user.id,
      followingId: otherUser.id
    },
    include: {
      follower: true,
      following: true
    }
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized request");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === session.user.id) {
    throw new Error("Cannot follow or unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: session.user.id,
      followingId: otherUser.id
    }
  });

  if (!existingFollow) {
    throw new Error("not following");
  }

  const unfollow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      follower: true,
      following: true
    }
  });
  return unfollow;
};
