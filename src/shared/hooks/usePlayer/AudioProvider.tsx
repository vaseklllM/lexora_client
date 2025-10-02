"use client";

import { useEffect } from "react";
import { usePlayerStore } from "./store";

export const AudioProvider = () => {
  useEffect(() => {
    usePlayerStore.getState().setAudio(new Audio());
  }, []);

  return null;
};
