"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullScreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const [lastVolume, setLastVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setLastVolume(volume);
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setLastVolume(volume);
    setVolume(isMuted ? lastVolume : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(20);
  }, []);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentFullScreen);
  };

  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === participant.identity);
  tracks.forEach((track) => {
    if (videoRef.current) {
      track.publication.track?.attach(videoRef.current);
    }
  });
  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width={"100%"} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            onToggle={toggleMute}
            value={volume}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
