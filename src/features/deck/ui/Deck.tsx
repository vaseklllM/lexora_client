"use client";

import { Deck as DeckEntity } from "@/entities/deck";
import { IDeck } from "@/shared/api/endpoints/schemas/deck.schema";
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
