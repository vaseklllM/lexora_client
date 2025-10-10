"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";

const Context = createContext<{ current: boolean }>({ current: true });

export const useIsFirstMount = () => {
  return useContext(Context);
};

export const FirstMountProvider = ({ children }: { children: ReactNode }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstMountRef = useRef(true);

  useLayoutEffect(() => {
    if (isFirstMountRef.current) {
      timerRef.current = setTimeout(() => {
        isFirstMountRef.current = false;
      }, 800);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Context.Provider value={isFirstMountRef}>{children}</Context.Provider>
  );
};
