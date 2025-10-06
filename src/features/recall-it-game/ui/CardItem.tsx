import { CefrEnum } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Cerf } from "@/shared/ui/Cefr";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 relative flex min-h-60 max-w-full flex-col rounded-xl p-2 sm:min-h-50 md:min-w-96 lg:min-h-42",
    titleWrapper: "flex h-full max-w-full items-center justify-center",
    title:
      "transition-blur max-w-full px-1 text-center text-xl break-words duration-300",
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
    isButtons: {
      true: {
        title: "mt-4",
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
    titleLength: props.title.length >= 80 ? "big" : undefined,
    descriptionLength:
      (props.description?.length ?? 0) >= 80 ? "big" : undefined,
    isButtons:
      (Array.isArray(props.soundUrls) && props.soundUrls?.length > 0) ||
      !!props.cefr,
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
