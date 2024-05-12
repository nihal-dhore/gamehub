import { authOptions } from "@/app/api/auth/libs/auth";
import { Session, getServerSession } from "next-auth";
import { db } from "./db";

export const getSelfByUsername = async (username: string) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user.username) {
    throw new Error("Unauthorized Request");
  }

  const user = await db.user.findUnique({
    where: {
      username: session.user.username
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (session.user.username !== username) {
    throw new Error("Unauthorized Request");
  }

  return user;
};