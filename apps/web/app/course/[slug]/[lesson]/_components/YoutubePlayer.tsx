import { useEffect, useRef } from "react";

interface Params {
  videoId: string;
  onPause: (seconds: number) => void;
  onEnded: () => void;
}

export function YouTubePlayer({ videoId, onPause, onEnded }: Params) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = createPlayer;

    function createPlayer() {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: {
          rel: 0,
          modestbranding: 0,
          controls: 1,
          iv_load_policy: 3,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PAUSED) {
              const seconds = playerRef?.current?.getCurrentTime?.() || 0;
              onPause(Math.floor(seconds));
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              onEnded();
            }
          },
        },
      });
    }
  }, [videoId]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden" && playerRef.current) {
        const seconds = Math.floor(playerRef.current?.getCurrentTime?.() || 0);
        if (seconds > 0) {
          onPause?.(Math.floor(seconds));
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <div id="youtube-player" className=" w-full h-full aspect-video" />;
}
