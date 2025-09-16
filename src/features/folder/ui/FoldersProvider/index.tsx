import { ReactElement } from "react";
import { ModalDeleteFolder } from "./ModalDeleteFolder";
import { ModalRenameFolder } from "./ModalRenameFolder";

interface Props {
  children: ReactElement;
}

export const FoldersProvider = (props: Props): ReactElement => {
  return (
    <>
      {props.children}
      <ModalDeleteFolder />
      <ModalRenameFolder />
    </>
  );
};
