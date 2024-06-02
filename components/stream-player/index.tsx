"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video-player";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { AboutCard } from "./about-card";
import { InfoCard } from "./info-card";

type CustomStream = {
  id: string;
  isLive: boolean;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  thumbnailUrl: string | null;
  name: string;
};

type CustomUser = {
  id: string;
  username: string | null;
  bio: string | null;
  imageUrl: string;
  stream: CustomStream | null;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}
export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, viewerIdentity } = useViewerToken(user.id);
  const { chatCollapsed } = useChatSidebar((state) => state);

  //console.log("id", token, name, identity);

  if (!token || !name || !viewerIdentity) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {chatCollapsed && (
        <div className="hidden lg:block fixed top-[82px] right-2 z-[49]">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 h-full",
          chatCollapsed && "lg:grid-cols-2 xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username!} hostIdentity={user.id} />
          <Header
            hostName={user.username!}
            hostIdentity={user.id}
            viewerIdentity={viewerIdentity}
            imgUrl={user.imageUrl!}
            isFollowing={isFollowing}
            streamName={stream.name}
            isLive={stream.isLive}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={viewerIdentity}
            streamName={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.username!}
            viewerIdentity={viewerIdentity}
            hostIdentity={user.id}
            bio={user.bio}
            key={user.id}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn("col-span-1", chatCollapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username!}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
