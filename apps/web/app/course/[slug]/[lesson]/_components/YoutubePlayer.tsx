import { useEffect, useRef } from "react";

interface Params {
  videoId: string;
  onPause: (seconds: number) => void;
  onEnded: () => void;
}

export function YouTubePlayer({ videoId, onPause, onEnded }: Params) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (playerRef.current && window.YT?.Player) {
      playerRef.current?.destroy?.();
      playerRef.current = null;
    }

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
          onReady: (event: any) => {
            playerRef.current = event.target;
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PAUSED) {
              const seconds = event.target?.getCurrentTime?.();
              if (Number.isFinite(seconds)) {
                onPause(Math.floor(seconds));
              }
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              onEnded();
            }
          },
        },
      });
    }

    return () => {
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden" && playerRef.current) {
        const seconds = Math.floor(playerRef.current?.getCurrentTime?.());
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

  return <div id="youtube-player" className="w-full h-full aspect-video" />;
}
