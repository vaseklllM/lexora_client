import { ReactElement } from "react";
import { ModalDeleteDeck } from "./ModalDeleteDeck";

interface Props {
  children?: ReactElement;
}

export const DecksProvider = (props: Props): ReactElement => {
  return (
    <>
      {props.children}
      <ModalDeleteDeck />
    </>
  );
};
