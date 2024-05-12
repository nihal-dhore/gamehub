
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}
export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>UserId: {user.id}</p>
      {/* {(isFollowing && <p>following</p>) || <p>follow</p>} */}
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
}
