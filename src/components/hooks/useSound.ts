import { useEffect } from "react";

const useSound = (src: string, play: boolean, volume: number = 1) => {
  useEffect(() => {
    if (!play) return;

    const audio = new Audio(src);
    audio.volume = volume;
    // Autoplay may be blocked without a user gesture; ignore the rejection.
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [play, src, volume]);
};

export default useSound;