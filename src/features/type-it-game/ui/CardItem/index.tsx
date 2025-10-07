import { player } from "@/shared/hooks/usePlayer";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Cerf } from "@/shared/ui/Cefr";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useActiveCard } from "../../hooks/useActiveCard";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 relative flex w-full max-w-full flex-col rounded-xl p-2",
    titleWrapper: "flex h-full max-w-full items-center justify-center",
    title:
      "transition-blur mt-4 max-w-full px-1 text-center text-xl break-words duration-300",
    descriptionWrapper: "bg-base-300 gap-2 rounded-lg p-2 py-3",
    description: "transition-blur text-center text-sm break-words duration-300",
    iconButtons: "absolute top-2 left-2 flex flex-row items-center gap-2",
  },
  variants: {
    isBlur: {
      true: {
        title: "blur-sm select-none",
        description: "blur-sm select-none",
      },
    },
    isBlurWordDescription: {
      true: {
        description: "blur-sm select-none",
      },
    },
    titleLength: {
      big: {
        title: "text-sm",
      },
    },
    descriptionLength: {
      big: {
        description: "text-xs",
      },
    },
  },
});

interface Props {
  className?: string;
  description?: string;
  isBlur?: boolean;
  isBlurWordDescription?: boolean;
}

export const CardItem = (props: Props): ReactElement => {
  const activeCard = useActiveCard();

  const classes = classesSlots({
    isBlur: props.isBlur,
    isBlurWordDescription: props.isBlurWordDescription,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.iconButtons()}>
        {activeCard.cefr && <Cerf cefr={activeCard.cefr} />}
        {activeCard.soundUrls?.map((soundUrl, idx) => (
          <ButtonIcon
            key={idx}
            icon="sound"
            variant="ghost"
            color="primary"
            onClick={() => {
              player.play(soundUrl);
            }}
          />
        ))}
      </div>
      <div className={classes.titleWrapper()}>
        <h3 className={classes.title()}>{activeCard.textInLearningLanguage}</h3>
      </div>
      {activeCard.descriptionInLearningLanguage && (
        <div className={classes.descriptionWrapper()}>
          <p className={classes.description()}>
            {activeCard.descriptionInLearningLanguage}
          </p>
        </div>
      )}
    </div>
  );
};
