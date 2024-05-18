"use client";

import { useMemo } from "react";
import { Hint } from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isDelayed: boolean;
  isChatFollowersOnly: boolean;
}
export const ChatInfo = ({ isDelayed, isChatFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isChatFollowersOnly && !isDelayed) {
      return "Only Followers can chat";
    }

    if (isDelayed && !isChatFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }

    if (isDelayed && isChatFollowersOnly) {
      return "Only Followers can chat Messages are delayed by 3 seconds";
    }
    return "";
  }, [isDelayed, isChatFollowersOnly]);

  const label = useMemo(() => {
    if (isChatFollowersOnly && !isDelayed) {
      return " Followers Only";
    }

    if (isDelayed && !isChatFollowersOnly) {
      return "Slow Mode";
    }

    if (isDelayed && isChatFollowersOnly) {
      return " Followers Only and Slow Mode";
    }
    return "";
  }, [isDelayed, isChatFollowersOnly]);

  if (!isDelayed && !isChatFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />{" "}
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
