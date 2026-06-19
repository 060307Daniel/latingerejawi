"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function BackgroundMusic() {
  const playerRef = useRef<any>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-bg-music", {
        videoId: "2_IUdY21fQM",
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: "2_IUdY21fQM",
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
            setReady(true);
          },
        },
      });
    };
  }, []);

  const toggleMute = () => {
    const player = playerRef.current;

    if (!player || !ready) return;

    // safety check method exist
    if (typeof player.mute !== "function") return;

    if (muted) {
      player.mute();
    } else {
      player.unMute();
    }

    setMuted(!muted);
  };

  return (
    <>
      {/* hidden player */}
      <div
        id="yt-bg-music"
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          bottom: 0,
          right: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* control button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-black px-4 py-3 text-white shadow-lg"
      >
        {muted ? "🔇 Matikan Musik" : "🔊 Hidupkan Musik"}
      </button>
    </>
  );
}