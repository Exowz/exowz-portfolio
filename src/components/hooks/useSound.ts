import { useEffect } from "react";

const useSound = (src: string, play: boolean, volume: number = 1) => {
  useEffect(() => {
    if (play) {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.play();
    }
  }, [play, src, volume]);
};

export default useSound;