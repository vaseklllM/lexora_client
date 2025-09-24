import { ICard } from "@/api/schemas/card.schema";
import { Card, CardSide } from "@/entities/card";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { memo, ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import { DeleteSide } from "./DeleteSide";
import { EditSide } from "./EditSide";
import { Language } from "@/api/schemas/language.schema";

const classesSlots = tv({
  slots: {
    base: "",
    front: "relative flex h-full w-full flex-col",
    frontTitleContainer:
      "flex h-full max-w-full flex-col items-center justify-center",
    frontTitle: "max-w-full text-xl font-bold break-words",
    frontTitleTranslation:
      "text-base-content/40 mt-2 max-w-full text-base break-words",
    frontDescriptionContainer:
      "bg-base-300 flex flex-col gap-2 rounded-xl p-2 break-words",
    frontDescription: "text-base-content text-sm",
    frontDescriptionTranslation: "text-base-content/60 text-sm",
    frontIconButtons: "absolute top-0 right-0 flex flex-col gap-2",
  },
  variants: {
    isDescription: {
      true: {
        front: "justify-between",
      },
      false: {
        front: "justify-center",
      },
    },
    isLargeDescription: {
      true: {
        frontDescription: "text-xs",
        frontDescriptionTranslation: "text-xs",
      },
    },
    isLargeWord: {
      true: {
        frontTitle: "text-xs",
        frontTitleTranslation: "text-xs",
      },
    },
    isFloatButtons: {
      true: {
        frontTitle: "max-w-[calc(100%-70px)]",
      },
    },
  },
});

interface Props {
  className?: string;
  card: ICard;
  deckId: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
}

export const ViewCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");
  const [backSide, setBackSide] = useState<"delete" | "edit">();

  const isDescription =
    !!props.card.descriptionInLearningLanguage ||
    !!props.card.descriptionInKnownLanguage;

  const isLargeDescription: boolean =
    (props.card.descriptionInKnownLanguage?.length ?? 0) > 70 ||
    (props.card.descriptionInLearningLanguage?.length ?? 0) > 70;

  const isLargeWord: boolean =
    (props.card.textInKnownLanguage?.length ?? 0) > 40 ||
    (props.card.textInLearningLanguage?.length ?? 0) > 40;

  const classes = classesSlots({
    isDescription,
    isLargeDescription,
    isLargeWord,
    isFloatButtons: isDescription && (isLargeWord || isLargeDescription),
  });

  const deleteHandler = useCallback(() => {
    setBackSide("delete");
    setActiveSide("back");
  }, [setBackSide, setActiveSide]);

  const editHandler = useCallback(() => {
    setBackSide("edit");
    setActiveSide("back");
  }, [setBackSide, setActiveSide]);

  const openFrontHandler = useCallback(() => {
    setActiveSide("front");
  }, [setActiveSide]);

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
          {isDescription && (
            <div className={classes.frontDescriptionContainer()}>
              {props.card.descriptionInLearningLanguage && (
                <p className={classes.frontDescription()}>
                  {props.card.descriptionInLearningLanguage}
                </p>
              )}
              {props.card.descriptionInKnownLanguage && (
                <p className={classes.frontDescriptionTranslation()}>
                  {props.card.descriptionInKnownLanguage}
                </p>
              )}
            </div>
          )}
          <div className={classes.frontIconButtons()}>
            <ButtonIcon
              icon="edit"
              variant="dash"
              color="primary"
              onClick={editHandler}
            />
            <ButtonIcon
              icon="delete"
              variant="dash"
              color="error"
              onClick={deleteHandler}
            />
          </div>
        </div>
      }
      back={
        <>
          {backSide === "delete" && (
            <DeleteSide
              deckId={props.deckId}
              setActiveSide={setActiveSide}
              card={props.card}
            />
          )}
          {backSide === "edit" && (
            <EditSide
              languageWhatILearn={props.languageWhatILearn}
              languageWhatIKnow={props.languageWhatIKnow}
              isActiveThisSide={activeSide === "back"}
              onOpenFront={openFrontHandler}
            />
          )}
        </>
      }
    />
  );
});

ViewCard.displayName = "AddCard";
