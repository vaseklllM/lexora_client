import { ReactElement } from "react";
import { ModalDeleteDeck } from "./ModalDeleteDeck";
import { ModalRenameDeck } from "./ModalRenameDeck";

interface Props {
  children?: ReactElement;
}

export const DecksProvider = (props: Props): ReactElement => {
  return (
    <>
      {props.children}
      <ModalDeleteDeck />
      <ModalRenameDeck />
    </>
  );
};
