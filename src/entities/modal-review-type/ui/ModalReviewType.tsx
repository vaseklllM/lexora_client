import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const ModalReviewType = (props: Props): ReactElement => {
  return <div className={props.className}>Modal</div>;
};
