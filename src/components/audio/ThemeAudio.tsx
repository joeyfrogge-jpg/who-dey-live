"use client";

import { useEffect, useRef } from "react";

/**
 * NFL on FOX theme song — plays on app open.
 * Fully compatible with iOS Safari and standalone PWA.
 */
export function ThemeAudio() {
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = document.createElement("audio");
    audio.src = "/nfl-on-fox-theme.mp3";
    audio.preload = "auto";
    audio.volume = 0.7;
    audio.setAttribute("playsinline", "");
    audio.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (startedRef.current) return;
      audio
        .play()
        .then(() => {
          startedRef.current = true;
        })
        .catch(() => {
          // Autoplay blocked — will retry on user interaction
        });
    };

    tryPlay();

    const onInteract = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };

    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("click", onInteract, { once: true });

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };
  }, []);

  return null;
}
