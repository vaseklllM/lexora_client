import LinkComponent, { LinkProps } from "next/link";
import React from "react";
import { tv } from "tailwind-variants";

const link = tv({
  base: "text-primary/80 hover:text-primary/90 font-semibold",
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
