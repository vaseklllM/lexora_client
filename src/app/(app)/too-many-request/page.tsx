import { AlertIcon } from "@/shared/icons/Alert";
import { BackTimer } from "./BackTimer";

interface Props {
  searchParams: Promise<{
    backUrl?: string;
  }>;
}

export default async function TooManyRequestPage(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <AlertIcon width="100px" height="100px" className="text-error" />
      <div className="mt-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Too many requests</h1>
        <p className="text-md text-base-content/60">
          You have made too many requests. <br />
          Please try again later.
        </p>
        <BackTimer
          className="text-md text-base-content/60"
          backUrl={searchParams.backUrl}
        />
      </div>
    </div>
  );
}
