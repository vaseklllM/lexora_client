import { Card, CardSide } from "@/entities/card";
import { ReactElement, useState } from "react";

interface Props {
  className?: string;
}

export const AddCard = (props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  return (
    <Card
      className={props.className}
      activeSide={activeSide}
      onSideChange={setActiveSide}
    />
  );
};
