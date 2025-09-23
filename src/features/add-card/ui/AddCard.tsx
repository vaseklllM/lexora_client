import { Card, CardSide } from "@/entities/card";
import { PlusIcon } from "@/shared/icons/Plus";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    card: "",
    buttonAdd: "btn btn-dash btn-primary rounded-full font-light",
  },
});

interface Props {
  className?: string;
}

export const AddCard = (props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  const classes = classesSlots();

  return (
    <Card
      className={classes.card({ className: props.className })}
      activeSide={activeSide}
      onSideChange={setActiveSide}
      front={
        <button
          className={classes.buttonAdd()}
          onClick={() => setActiveSide("back")}
          disabled={activeSide === "back"}
        >
          Add Card
          <PlusIcon />
        </button>
      }
      back={
        <p>
          Lorem ipsum
          <ButtonIcon
            icon="edit"
            onClick={() =>
              setActiveSide?.(activeSide === "front" ? "back" : "front")
            }
            disabled={activeSide === "front"}
          />
        </p>
      }
    />
  );
};
