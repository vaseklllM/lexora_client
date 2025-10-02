import { create } from "zustand";

type State = {
  isPlaying: boolean;
  audio?: HTMLAudioElement;
};

type Actions = {
  setIsPlaying: (isPlaying: boolean) => void;
  setAudio: (audio: HTMLAudioElement) => void;
};

export const usePlayerStore = create<State & Actions>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => {
    set({ isPlaying });
  },
  setAudio: (audio: HTMLAudioElement) => {
    set({ audio });
  },
}));
