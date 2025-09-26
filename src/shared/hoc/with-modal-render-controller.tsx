"use client";

import { ComponentType, ReactElement, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
}

export function withModalRenderController<P extends Props>(
  Modal: ComponentType<P>,
) {
  return function Controller(props: P): ReactElement | null {
    const { isOpen, ...restProps } = props;
    const [isRender, setIsRender] = useState(isOpen);
    const [isOpenController, setIsOpenController] = useState<boolean>(isOpen);

    useEffect(() => {
      if (isOpen) {
        setIsRender(true);
        setTimeout(() => {
          setIsOpenController(true);
        }, 0);
      } else {
        setIsOpenController(false);
        setTimeout(() => {
          setIsRender(false);
        }, 300);
      }
    }, [isOpen]);

    if (isRender) {
      return <Modal {...({ isOpen: isOpenController, ...restProps } as P)} />;
    }

    return null;
  };
}
