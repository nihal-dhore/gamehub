"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);


export const onBlock = async (id: string) => {
  try {
    const self = await getSelf();

    let blockedUser;
    try {
      blockedUser = await blockUser(id);
    } catch {

    }

    try {
      await roomService.removeParticipant(self.id, id);
    } catch {

    }

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
  } catch {
    throw new Error("Internal server error");
  }
};
export const onUnblock = async (id: string) => {
  const unblockedUser = await unblockUser(id);

  revalidatePath("/");

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }

  return unblockedUser;
};