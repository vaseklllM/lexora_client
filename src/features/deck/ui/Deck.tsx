"use client";

import { IDeck } from "@/api/schemas/deck.schema";
import { Deck as DeckEntity } from "@/entities/deck";
import { ReactElement, useState } from "react";
import { useButtons } from "./useButtons";

interface Props {
  className?: string;
  deck: IDeck;
}

export const Deck = (props: Props): ReactElement => {
  const [isOpenModalDeleteAgree, setIsOpenModalDeleteAgree] = useState(false);
  const [isOpenModalRenameFolder, setIsOpenModalRenameFolder] = useState(false);

  const buttons = useButtons({
    setIsOpenModalDeleteAgree,
    setIsOpenModalRenameFolder,
  });

  return (
    <>
      <DeckEntity {...props} dottedDropdownButtons={buttons} />
      {isOpenModalDeleteAgree && "isOpenModalDeleteAgree"}
      {isOpenModalRenameFolder && "isOpenModalRenameFolder"}
    </>
  );
};
