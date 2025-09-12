"use client";

import { Button } from "@/shared/ui/Button";
import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const Test = (props: Props): ReactElement => {
  //   console.log(useSession());
  return (
    <div className={props.className}>
      <Button onClick={() => signOut({ redirect: false })} className="mt-10">
        logout
      </Button>
    </div>
  );
};
