import { CefrEnum } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Cerf } from "@/shared/ui/Cefr";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 relative flex min-h-42 flex-col rounded-xl p-2 md:min-w-96",
    titleWrapper: "flex h-full items-center justify-center",
    title: "transition-blur text-center text-xl duration-300",
    descriptionWrapper: "bg-base-300 gap-2 rounded-lg p-2 py-3",
    description: "transition-blur text-center text-sm duration-300",
    iconButtons: "absolute top-2 left-2 flex flex-row gap-2",
    soundButton: "",
  },
  variants: {
    isBlur: {
      true: {
        title: "blur-sm",
        description: "blur-sm",
      },
    },
    isBlurWordDescription: {
      true: {
        description: "blur-sm",
      },
    },
  },
});

interface Props {
  className?: string;
  title: string;
  description?: string;
  isBlur?: boolean;
  isBlurWordDescription?: boolean;
  soundUrls?: string[];
  cefr?: CefrEnum;
}

export const CardItem = (props: Props): ReactElement => {
  const classes = classesSlots({
    isBlur: props.isBlur,
    isBlurWordDescription: props.isBlurWordDescription,
  });

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
            className={classes.soundButton()}
          />
        ))}
      </div>
      <div className={classes.titleWrapper()}>
        <h3 className={classes.title()}>{props.title}</h3>
      </div>
      <div className={classes.descriptionWrapper()}>
        <p className={classes.description()}>{props.description}</p>
      </div>
    </div>
  );
};
