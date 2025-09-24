import { ICard } from "@/api/schemas/card.schema";
import { Card, CardSide } from "@/entities/card";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { memo, ReactElement, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "",
    front: "relative flex h-full w-full flex-col items-center",
    frontTitleContainer: "",
    frontTitle: "text-2xl font-bold",
    frontTitleTranslation: "text-base-content/40 mt-2 text-base",
    frontDescription: "text-base-content text-sm",
    frontIconButtons: "absolute top-0 right-0 flex flex-col gap-2",
    back: "",
    backTitle: "",
  },
  variants: {
    isDescription: {
      true: {
        front: "justify-evenly",
      },
      false: {
        front: "justify-center",
      },
    },
  },
});

interface Props {
  className?: string;
  card: ICard;
}

export const ViewCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  const classes = classesSlots({
    isDescription:
      !!props.card.descriptionInLearningLanguage ||
      !!props.card.descriptionInKnownLanguage,
  });

  return (
    <Card
      className={classes.base({ className: props.className })}
      activeSide={activeSide}
      onSideChange={setActiveSide}
      front={
        <div className={classes.front()}>
          <div className={classes.frontTitleContainer()}>
            <h2 className={classes.frontTitle()}>
              {props.card.textInLearningLanguage}
            </h2>
            <p className={classes.frontTitleTranslation()}>
              {props.card.textInKnownLanguage}
            </p>
          </div>
          {props.card.descriptionInLearningLanguage && (
            <p className={classes.frontDescription()}>
              {props.card.descriptionInLearningLanguage}
            </p>
          )}
          <div className={classes.frontIconButtons()}>
            <ButtonIcon icon="edit" variant="dash" color="primary" />
            <ButtonIcon icon="delete" variant="dash" color="error" />
          </div>
        </div>
      }
      back={
        <div className={classes.back()}>{props.card.textInKnownLanguage}</div>
      }
    />
  );
});

ViewCard.displayName = "AddCard";
