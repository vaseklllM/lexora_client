"use client";

// import { useSession } from "next-auth/react";
import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const Test = (props: Props): ReactElement => {
  //   console.log(useSession());
  return <div className={props.className}>Test</div>;
};
