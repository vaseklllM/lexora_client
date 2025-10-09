import { ReactElement } from "react";

interface Props {
  className?: string;
  isOpen: boolean;
}

export const ModalRepeatCardsType = (props: Props): ReactElement => {
  return <div className={props.className}>Modal</div>;
};
