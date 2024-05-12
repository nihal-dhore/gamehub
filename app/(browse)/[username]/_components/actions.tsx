"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`following ${data.following.username}`))
        .catch(() => toast.error("Internal server error"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`unfollowed ${data.following.username}`))
        .catch(() => toast.error("Internal server error"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user ${data?.blocked.username}`)
        )
        .catch(() => {
          toast.error("Internal server error");
        });
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`unblocked the user ${data.blocked.username}`)
        )
        .catch(() => toast.error("Internal server error"));
    });
  };
  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant={isFollowing ? "outline" : "primary"}
        className=""
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleUnblock} disabled={isPending}>
        Block
      </Button>
    </>
  );
};
