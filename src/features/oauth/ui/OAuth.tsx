import { GoogleIcon } from "@/shared/icons/Google";
import { Button } from "@/shared/ui/Button";
import { signIn } from "next-auth/react";
import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const OAuth = (props: Props): ReactElement => {
  return (
    <div className={props.className}>
      <div className="divider mt-6">
        <p className="text-base-content/70 text-sm">Or continue with</p>
      </div>

      <Button
        className="btn-soft text-base-content/70 mt-2 w-full"
        type="button"
        onClick={() => signIn("google")}
      >
        <GoogleIcon /> Google
      </Button>
    </div>
  );
};
