"use client";

import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { useTimer } from "react-timer-hook";

interface Props {
  className?: string;
  backUrl?: string;
}

export const BackTimer = (props: Props): ReactElement => {
  const router = useRouter();
  const { seconds } = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * 10),
    onExpire: () => {
      if (props.backUrl) {
        router.push(props.backUrl);
      } else {
        router.back();
      }
    },
  });

  return (
    <p className={props.className}>
      The page will refresh in {seconds} seconds
    </p>
  );
};
