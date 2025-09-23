import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const AddCard = (props: Props): ReactElement => {
  return <div className={props.className}>AddCard</div>;
};
