"use client";

import {
  ComponentType,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  isOpen: boolean;
}

export function withModalRenderController<P extends Props>(
  Modal: ComponentType<P>,
) {
  return function Controller(props: P): ReactElement | null {
    const { isOpen, ...restProps } = props;
    const [isRender, setIsRender] = useState(false);
    const [isOpenController, setIsOpenController] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (isOpen) {
        setIsRender(true);
        timeoutRef.current = setTimeout(() => {
          setIsOpenController(true);
          timeoutRef.current = null;
        }, 0);
      } else {
        setIsOpenController(false);
        timeoutRef.current = setTimeout(() => {
          setIsRender(false);
          timeoutRef.current = null;
        }, 300);
      }

      // Cleanup function
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, [isOpen]);

    if (isRender) {
      return <Modal {...({ isOpen: isOpenController, ...restProps } as P)} />;
    }

    return null;
  };
}
