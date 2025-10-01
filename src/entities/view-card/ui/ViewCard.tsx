import { ICard } from "@/api/schemas/card.schema";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Cerf } from "@/shared/ui/Cefr";
import { memo, ReactElement, ReactNode } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 relative flex h-full w-full flex-col rounded-xl",
    frontTitleContainer:
      "flex h-full max-w-full flex-col items-center justify-center",
    frontTitle: "max-w-full text-xl font-bold break-words",
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
    isLargeDescription: {
      true: {
        frontDescription: "text-xs",
        frontDescriptionTranslation: "text-xs",
      },
    },
    isLargeWord: {
      true: {
        frontTitle: "",
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
  iconButtons?: ReactNode;
  descriptionWrapperClassName?: string;
}

export const ViewCard = memo((props: Props): ReactElement => {
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

  const isNativeSound = props.card.soundUrls.length > 0;

  return (
    <div className={classes.base({ className: props.className })}>
      {isNativeSound && (
        <div className={classes.headerRow()}>
          <Cerf cefr={props.card.cefr} />
          {props.card.soundUrls.map((soundUrl, idx) => (
            <ButtonIcon
              key={idx}
              icon="sound"
              variant="ghost"
              color="primary"
              onClick={() => {
                const audio = new Audio(soundUrl);
                audio.play();
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
