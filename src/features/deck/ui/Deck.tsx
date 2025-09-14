import { Deck as DeckEntity } from "@/entities/deck";
import { IDeck } from "@/shared/api/endpoints/dashboard";
import { ReactElement } from "react";

interface Props {
  className?: string;
  deck: IDeck;
}

export const Deck = (props: Props): ReactElement => {
  return <DeckEntity {...props} />;
};
