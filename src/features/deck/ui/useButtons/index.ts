import { DropdownItem } from "@/entities/dropdown-menu";
import { useMemo } from "react";
import { useDeckStore } from "../../model/store";
import { DeckProps } from "../Deck";

const enum Button {
  RENAME,
  DELETE,
}

export function useButtons(props: DeckProps): DropdownItem[] {
  const openModalRenameDeck = useDeckStore(
    (state) => state.openModalRenameDeck,
  );
  const openModalDeleteDeck = useDeckStore(
    (state) => state.openModalDeleteDeck,
  );

  return useMemo((): DropdownItem[] => {
    return [
      {
        id: Button.RENAME,
        type: "button",
        label: "Rename",
        icon: "edit",
        onClick: ({ closePopover }) => {
          closePopover();
          openModalRenameDeck({
            id: props.deck.id,
            name: props.deck.name,
          });
        },
      },
      {
        id: Button.DELETE,
        type: "button",
        label: "Delete",
        icon: "delete",
        onClick: ({ closePopover }) => {
          closePopover();
          openModalDeleteDeck({
            id: props.deck.id,
            name: props.deck.name,
          });
        },
      },
    ];
  }, [
    props.deck.id,
    props.deck.name,
    openModalDeleteDeck,
    openModalRenameDeck,
  ]);
}
