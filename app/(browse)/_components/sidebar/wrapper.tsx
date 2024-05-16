"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeletons } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [client, setClient] = useState(false);
  const { collapsed } = useSidebar((state) => state);

  useEffect(() => {
    setClient(true);
    //console.log(client);
  }, []);

  if (!client) {
    //console.log(client);
    return (
      <aside className="fixed flex flex-col left-0 w-[70px] lg:w-60 h-screen bg-background border-r border-[#2D2E35] z-[49]">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeletons />
      </aside>
    );
  }
  return (
    <aside
      className={cn(
        "fixed flex flex-col left-0 w-60 h-screen bg-background border-r border-[#2D2E35] z-[49]",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
