import { authOptions } from "@/app/api/auth/libs/auth";
import { Session, getServerSession } from "next-auth";
import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized access");
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
      return false;
    }

    const alreadyBlockedByOther = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockerId: otherUser.id,
          blockedId: session.user.id
        }
      }
    });
    return !!alreadyBlockedByOther;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized access");
  }
  //console.log(session);

  if (session.user.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  });
  //console.log(otherUser);

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: session.user.id,
        blockedId: otherUser.id
      }
    }
  });

  if (existingBlock) {
    throw new Error("User is already blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: session.user.id,
      blockedId: id
    }, include: {
      blocked: true
    }
  });
  return block;
};

export const unblockUser = async (id: string) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized access");
  }

  if (session.user.id === id) {
    throw new Error("Cannot block/unblock yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: session.user.id,
        blockedId: otherUser.id
      }
    }
  });

  if (!existingBlock) {
    throw new Error("User is not blocked");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id
    },
    include: {
      blocked: true
    }
  });
  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self.id
    },
    include: {
      blocked: true
    }
  });

  return blockedUsers;
};