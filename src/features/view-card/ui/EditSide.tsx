import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const EditSide = (props: Props): ReactElement => {
  return <div className={props.className}>EditSide</div>;
};
