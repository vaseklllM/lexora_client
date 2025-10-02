import { usePlayerStore } from "./store";

export const player = {
  play(soundUrl: string, callback?: () => void) {
    const { audio, setIsPlaying } = usePlayerStore.getState();
    if (!audio) return;
    audio.src = soundUrl;

    audio.play();
    audio.onended = () => {
      setIsPlaying(false);
      callback?.();
    };
    audio.onerror = () => {
      setIsPlaying(false);
      callback?.();
    };
    audio.onpause = () => {
      setIsPlaying(false);
      callback?.();
    };
    audio.onplay = () => {
      setIsPlaying(true);
    };
  },
  async playAsync(soundUrl: string) {
    return new Promise((resolve) => {
      this.play(soundUrl, () => resolve(true));
    });
  },
  useIsPlaying() {
    return usePlayerStore((state) => state.isPlaying);
  },
};
