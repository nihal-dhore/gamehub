"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "@/components/ui/button";

export const ChatToggle = () => {
  const { chatCollapsed, onCollapse, onExpand } = useChatSidebar(
    (state) => state
  );
  let Icon = chatCollapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const onToggle = () => {
    if (chatCollapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = chatCollapsed ? "Expand" : "Collapse";
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
