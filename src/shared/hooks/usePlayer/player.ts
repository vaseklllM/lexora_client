import { usePlayerStore } from "./store";

export const player = {
  play(soundUrl: string) {
    const { audio, setIsPlaying } = usePlayerStore.getState();
    if (!audio) return;
    audio.src = soundUrl;

    audio.play();
    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.onerror = () => {
      setIsPlaying(false);
    };
    audio.onpause = () => {
      setIsPlaying(false);
    };
    audio.onplay = () => {
      setIsPlaying(true);
    };
  },
  async playAsync(soundUrl: string) {
    return new Promise((resolve) => {
      const { audio, setIsPlaying } = usePlayerStore.getState();
      if (!audio) return;
      audio.src = soundUrl;

      audio.play();
      audio.onended = () => {
        setIsPlaying(false);
        resolve(true);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        resolve(true);
      };
      audio.onpause = () => {
        setIsPlaying(false);
        resolve(true);
      };
      audio.onplay = () => {
        setIsPlaying(true);
      };
    });
  },
  useIsPlaying() {
    return usePlayerStore((state) => state.isPlaying);
  },
};
