"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { GoogleIcon } from "@/shared/icons/Google";
import { Button } from "@/shared/ui/Button";
import { signIn } from "next-auth/react";
import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const OAuth = (props: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={props.className}>
      <div className="divider mt-6">
        <p className="text-base-content/70 text-sm">
          {t("sign_in.or_continue_with")}
        </p>
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
