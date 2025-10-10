"use client";

import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Cerf } from "@/shared/ui/Cefr";
import { CircleProgress } from "@/shared/ui/CircleProgress";
import { memo, ReactElement, ReactNode } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "relative flex h-full w-full flex-col rounded-xl",
    frontTitleContainer:
      "flex h-full max-w-full flex-col items-center justify-center",
    frontTitle: "max-w-full text-center text-xl font-bold break-words",
    headerRow: "flex items-center gap-2",
    frontSound: "",
    cefr: "text-base-content/40 text-sm",
    frontTitleTranslation:
      "text-base-content/40 mt-2 max-w-full text-center text-base break-words",
    frontDescriptionContainer:
      "bg-base-300 flex flex-col gap-2 rounded-xl p-2 break-words",
    frontDescription: "text-base-content text-center text-sm",
    frontDescriptionTranslation: "text-base-content/60 text-center text-sm",
    frontIconButtons: "absolute top-0 right-0 flex flex-col gap-2",
  },
  variants: {
    isDescription: {
      true: {
        base: "justify-between",
      },
      false: {
        base: "justify-center",
      },
    },
    titleLength: {
      big: {
        frontTitle: "text-sm",
      },
    },
    titleTranslationLength: {
      big: {
        frontTitleTranslation: "text-xs",
      },
    },
    descriptionLength: {
      big: {
        frontDescription: "text-xs",
        frontDescriptionTranslation: "text-xs",
      },
    },
    isFloatButtons: {
      true: {
        frontTitle: "max-w-[calc(100%-70px)]",
      },
    },
    useBackground: {
      true: {
        base: "bg-base-100",
      },
    },
  },
});

interface Props {
  className?: string;
  card: ICard;
  iconButtons?: ReactNode;
  descriptionWrapperClassName?: string;
  disabled?: boolean;
  useBackground?: boolean;
}

export const ViewCard = memo((props: Props): ReactElement => {
  const isDescription =
    !!props.card.descriptionInLearningLanguage ||
    !!props.card.descriptionInKnownLanguage;

  const isLargeDescription: boolean =
    (props.card.descriptionInKnownLanguage?.length ?? 0) >= 50 ||
    (props.card.descriptionInLearningLanguage?.length ?? 0) >= 50;

  const isLargeWord: boolean =
    (props.card.textInKnownLanguage?.length ?? 0) >= 80 ||
    (props.card.textInLearningLanguage?.length ?? 0) >= 80;

  const classes = classesSlots({
    isDescription,
    isFloatButtons: isDescription && (isLargeWord || isLargeDescription),
    useBackground: props.useBackground,
    titleLength:
      props.card.textInLearningLanguage?.length >= 80 ? "big" : undefined,
    titleTranslationLength:
      props.card.textInKnownLanguage?.length >= 80 ? "big" : undefined,
    descriptionLength: isLargeDescription ? "big" : undefined,
  });

  const isNativeSound = props.card.soundUrls.length > 0;

  return (
    <div className={classes.base({ className: props.className })}>
      {isNativeSound && (
        <div className={classes.headerRow()}>
          <Cerf cefr={props.card.cefr} />
          <CircleProgress value={20} />
          {props.card.soundUrls.map((soundUrl, idx) => (
            <ButtonIcon
              key={idx}
              icon="sound"
              variant="ghost"
              color="primary"
              disabled={props.disabled}
              onClick={() => {
                player.play(soundUrl);
              }}
              className={classes.frontSound()}
            />
          ))}
        </div>
      )}
      <div className={classes.frontTitleContainer()}>
        <h2 className={classes.frontTitle()}>
          {props.card.textInLearningLanguage}
        </h2>
        <p className={classes.frontTitleTranslation()}>
          {props.card.textInKnownLanguage}
        </p>
      </div>
      {isDescription && (
        <div
          className={classes.frontDescriptionContainer({
            className: props.descriptionWrapperClassName,
          })}
        >
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
      {props.iconButtons && (
        <div className={classes.frontIconButtons()}>{props.iconButtons}</div>
      )}
    </div>
  );
});

ViewCard.displayName = "ViewCard";
