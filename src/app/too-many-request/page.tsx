import { Alert } from "@/shared/ui/Alert";
import { BackTimer } from "./BackTimer";

interface Props {
  searchParams: Promise<{
    backUrl?: string;
  }>;
}

export default async function TooManyRequestPage(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Alert
        message={
          <>
            <strong>Oops:</strong> Too many requests
          </>
        }
        type="error"
      />
      <BackTimer backUrl={searchParams.backUrl} />
    </div>
  );
}
