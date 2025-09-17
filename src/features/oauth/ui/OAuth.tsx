import { AppleIcon } from "@/shared/icons/Apple";
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
      <div className="grid grid-cols-2 items-center justify-center gap-6">
        <Button
          className="btn-soft text-base-content/70 mt-2 w-full"
          type="button"
          onClick={() => signIn("google")}
        >
          <GoogleIcon /> Google
        </Button>
        <Button
          className="btn-soft text-base-content/70 mt-2 w-full"
          type="button"
          onClick={() => signIn("apple")}
        >
          <AppleIcon /> Apple
        </Button>
      </div>
    </div>
  );
};
