import { db } from "@/lib/db"

export const getRecommended = async () => {
  //await new Promise(resolve => setTimeout(resolve, 5000))
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return users;
  } catch (error) {
    throw new Error("Internal server error");
  }
} 