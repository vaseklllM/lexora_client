import { useCallback, useRef, useState } from "react";

export function useBlurWordDescription() {
  const [isBlurWordDescription, setIsBlurWordDescription] =
    useState<boolean>(true);
  const blurDescriptionTimer = useRef<NodeJS.Timeout>(null);

  const blurWordDescription = useCallback(() => {
    if (blurDescriptionTimer.current) {
      clearTimeout(blurDescriptionTimer.current);
    }

    setIsBlurWordDescription(true);
    blurDescriptionTimer.current = setTimeout(() => {
      setIsBlurWordDescription(false);
    }, 4000);
  }, []);

  const showDescriptionWord = useCallback(() => {
    if (blurDescriptionTimer.current) {
      clearTimeout(blurDescriptionTimer.current);
    }

    setIsBlurWordDescription(false);
  }, []);

  return {
    isBlurWordDescription,
    blurWordDescription,
    showDescriptionWord,
  };
}
