"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays the NFL on FOX theme immediately on app open.
 * Place the file at /public/nfl-on-fox-theme.mp3 (the attached audio).
 * Browsers may require a user gesture for unmuted autoplay; we attempt
 * immediately and also on first interaction as fallback.
 */
export function ThemeAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/nfl-on-fox-theme.mp3");
    audio.loop = false;
    audio.volume = 0.7;
    audio.preload = "auto";
    audioRef.current = audio;

    const tryPlay = () => {
      if (started) return;
      audio
        .play()
        .then(() => setStarted(true))
        .catch(() => {
          // Autoplay blocked — will retry on first interaction
        });
    };

    // Attempt immediately
    tryPlay();

    // Fallback: start on any user interaction
    const onInteract = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
  }, [started]);

  return null; // invisible; pure side-effect
}
