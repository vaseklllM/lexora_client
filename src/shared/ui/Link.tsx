import LinkComponent, { LinkProps } from "next/link";
import React from "react";
import { tv } from "tailwind-variants";

const link = tv({
  base: "font-semibold text-indigo-600 hover:text-indigo-500",
});

interface Props extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const Link = (props: Props): React.ReactElement | null => {
  return (
    <LinkComponent {...props} className={link(props)}>
      {props.children}
    </LinkComponent>
  );
};
