"use client";

import { routes } from "@/shared/routes";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { useTimer } from "react-timer-hook";

interface Props {
  className?: string;
  backUrl?: string;
}

export const BackTimer = (props: Props): ReactElement => {
  const { backUrl = routes.dashboard.url() } = props;

  const router = useRouter();
  const { seconds } = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * 10),
    onExpire: () => {
      router.push(backUrl);
    },
  });

  return (
    <p className="text-center">The page will refresh in {seconds} seconds</p>
  );
};
