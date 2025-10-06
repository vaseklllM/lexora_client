import { useCallback, useEffect, useRef, useState } from "react";

export function useBlurWordDescription() {
  const [isBlur, setIsBlur] = useState<boolean>(true);
  const blurDescriptionTimer = useRef<NodeJS.Timeout>(null);

  const blur = useCallback(() => {
    if (blurDescriptionTimer.current) {
      clearTimeout(blurDescriptionTimer.current);
    }

    setIsBlur(true);
    blurDescriptionTimer.current = setTimeout(() => {
      setIsBlur(false);
    }, 4000);
  }, []);

  const show = useCallback(() => {
    if (blurDescriptionTimer.current) {
      clearTimeout(blurDescriptionTimer.current);
    }

    setIsBlur(false);
  }, []);

  useEffect(() => {
    blur();
  }, []);

  return {
    isBlur,
    show,
    blur,
  };
}
