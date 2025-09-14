"use client";

import { Alert } from "@/shared/ui/Alert";
import { useTimer } from "react-timer-hook";

export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { error } = props;

  switch (error.name) {
    case "TooManyRequestsError":
      return <TooManyRequestsError message={error.message} />;

    default:
      throw error;
  }
}

function TooManyRequestsError(props: { message: string }) {
  const { seconds } = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * 10),
    onExpire: () => {
      window.location.reload();
    },
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <Alert
        message={
          <>
            <strong>Oops:</strong> {props.message}
          </>
        }
        type="error"
      />
      <p className="text-center">The page will refresh in {seconds} seconds</p>
    </div>
  );
}
