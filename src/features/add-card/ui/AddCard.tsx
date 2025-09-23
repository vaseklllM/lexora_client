import { Card, CardSide } from "@/entities/card";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
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
      front={
        <p>
          Diligord
          <ButtonIcon
            icon="edit"
            onClick={() =>
              setActiveSide?.(activeSide === "front" ? "back" : "front")
            }
          />
        </p>
      }
      back={
        <p>
          Lorem ipsum
          <ButtonIcon
            icon="edit"
            onClick={() =>
              setActiveSide?.(activeSide === "front" ? "back" : "front")
            }
          />
        </p>
      }
    />
  );
};
