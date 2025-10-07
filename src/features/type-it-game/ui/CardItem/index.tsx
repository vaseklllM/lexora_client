import { CefrEnum } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Cerf } from "@/shared/ui/Cefr";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { TranslationValue } from "./TranslationValue";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 relative flex w-full max-w-full flex-col rounded-xl p-2",
    titleWrapper:
      "flex h-full max-w-full flex-col items-center justify-center gap-2",
    translationInput: "",
    title: "transition-blur max-w-full px-1 text-center text-xl break-words",
    descriptionWrapper: "bg-base-300 gap-2 rounded-lg p-2 py-3",
    description: "transition-blur text-center text-sm break-words",
    iconButtons: "absolute top-2 left-2 flex flex-row items-center gap-2",
  },
});

interface Props {
  className?: string;
  title: string;
  description?: string;
  soundUrls?: string[];
  cefr?: CefrEnum;
  isUnrightAnswer?: boolean;
}

export const CardItem = (props: Props): ReactElement => {
  const classes = classesSlots({});

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.iconButtons()}>
        {props.cefr && <Cerf cefr={props.cefr} />}
        {props.soundUrls?.map((soundUrl, idx) => (
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
        {props.isUnrightAnswer && (
          <TranslationValue className={classes.translationInput()} />
        )}
        <h3 className={classes.title()}>{props.title}</h3>
      </div>
      {props.description && (
        <div className={classes.descriptionWrapper()}>
          <p className={classes.description()}>{props.description}</p>
        </div>
      )}
    </div>
  );
};
