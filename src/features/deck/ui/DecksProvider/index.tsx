import { ReactElement, ReactNode } from "react";
import { ModalDeleteDeck } from "./ModalDeleteDeck";
import { ModalRenameDeck } from "./ModalRenameDeck";

interface Props {
  children?: ReactNode;
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
