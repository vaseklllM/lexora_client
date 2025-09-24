import { ICard } from "@/api/schemas/card.schema";
import { CardSide } from "@/entities/card";
import { DeleteIcon } from "@/shared/icons/Delete";
import { PlusIcon } from "@/shared/icons/Plus";
import { ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col items-center justify-center",
    title: "max-w-full text-xl font-bold break-words",
    name: "text-base-content/60 mt-2 max-w-full text-base font-light break-words",
    buttons: "mt-8 flex w-full items-center justify-evenly",
    buttonCancel: "btn btn-dash btn-primary btn-sm rounded-full font-light",
    plus: "rotate-45",
    buttonDelete: "btn btn-dash btn-error btn-sm rounded-full font-light",
  },
});

interface Props {
  className?: string;
  setActiveSide: (side: CardSide) => void;
  card: ICard;
}

export const DeleteSide = (props: Props): ReactElement => {
  const classes = classesSlots();

  const cancelHandler = useCallback(() => {
    props.setActiveSide("front");
  }, [props.setActiveSide]);

  const deleteHandler = useCallback(() => {
    props.setActiveSide("front");
  }, [props.setActiveSide]);

  return (
    <div className={classes.base({ className: props.className })}>
      <h3 className={classes.title()}>Delete card?</h3>
      <p className={classes.name()}>
        &quot;{props.card.textInLearningLanguage}&quot;
      </p>
      <div className={classes.buttons()}>
        <button className={classes.buttonCancel()} onClick={cancelHandler}>
          Cancel
          <PlusIcon className={classes.plus()} height="20px" width="20px" />
        </button>
        <button className={classes.buttonDelete()} onClick={deleteHandler}>
          Delete
          <DeleteIcon height="18px" width="18px" />
        </button>
      </div>
    </div>
  );
};
