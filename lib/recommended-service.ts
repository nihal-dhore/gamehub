import { authOptions } from "@/app/api/auth/libs/auth";
import { db } from "@/lib/db";
import { Session, getServerSession } from "next-auth";

export const getRecommended = async () => {
  const session: Session | null = await getServerSession(authOptions);
  //await new Promise(resolve => setTimeout(resolve, 5000))
  try {
    const users = await db.user.findMany({
      where: {
        AND: [{
          NOT: {
            id: session?.user.id
          },
        }, {
          NOT: {
            followedBy: {
              some: {
                followerId: session?.user.id
              }
            }
          }
        }, {
          NOT: {
            Blocking: {
              some: {
                blockedId: session?.user.id
              }
            }
          }
        }]
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return users;
  } catch (error) {
    throw new Error("Internal server error");
  }
}; 