"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays the NFL on FOX theme as soon as the app opens.
 * Optimized for iOS Safari / standalone PWA mode.
 *
 * Place the file at: public/nfl-on-fox-theme.mp3
 */
export function ThemeAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Create audio element with iOS-friendly attributes
    const audio = document.createElement("audio");
    audio.src = "/nfl-on-fox-theme.mp3";
    audio.preload = "auto";
    audio.loop = false;
    audio.volume = 0.75;
    // Critical for iOS Safari
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
    audioRef.current = audio;

    const tryPlay = async () => {
      if (started || !audioRef.current) return;
      try {
        await audioRef.current.play();
        setStarted(true);
      } catch {
        // Autoplay blocked (common on iOS). Will retry on interaction.
      }
    };

    // Attempt immediately
    tryPlay();

    // iOS almost always requires a user gesture for unmuted audio.
    // Retry on first interaction of any kind.
    const onInteract = () => {
      tryPlay();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("click", onInteract);
    };

    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true });
    window.addEventListener("click", onInteract, { once: true });

    return () => {
      cleanup();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [started]);

  return null;
}
