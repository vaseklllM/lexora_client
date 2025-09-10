import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const Checkbox = (props: Props): ReactElement => {
  return <div className={props.className}>Checkbox</div>;
};
