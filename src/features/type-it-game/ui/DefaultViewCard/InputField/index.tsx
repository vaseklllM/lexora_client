import { Input } from "@/shared/ui/Input";

import { CSSProperties, ReactElement } from "react";
import { tv } from "tailwind-variants";
import {
  UNRIGHT_ANSWER_ANIMATION_DURATION,
  useTypeItGameStore,
} from "../../../model/store";

const classesSlots = tv({
  slots: {
    base: "w-full",
    input: "rounded-xl py-4 text-center",
  },
  variants: {
    unrightAnswerAnimation: {
      true: {
        input: "animate-shakeX text-error!",
      },
    },
    viewVariant: {
      default: {},
      unrightAnswer: {
        input: "text-error!",
      },
    },
  },
});

interface Props {
  className?: string;
}

export const InputField = (props: Props): ReactElement => {
  const translationInput = useTypeItGameStore(
    (state) => state.translationInput,
  );
  const setTranslationInput = useTypeItGameStore(
    (state) => state.setTranslationInput,
  );
  const checkTranslation = useTypeItGameStore(
    (state) => state.checkTranslation,
  );
  const unrightAnswerAnimation = useTypeItGameStore(
    (state) => state.unrightAnswerAnimation,
  );

  const viewVariant = useTypeItGameStore((state) => state.viewVariant);

  const classes = classesSlots({
    unrightAnswerAnimation,
    viewVariant,
  });

  return (
    <Input
      className={classes.base({ className: props.className })}
      inputClassName={classes.input()}
      placeholder="Type the translation"
      value={translationInput}
      disabled={unrightAnswerAnimation || viewVariant !== "default"}
      onChange={(e) => setTranslationInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          checkTranslation();
        }
      }}
      style={
        {
          "--animation-shakeX-duration": `${UNRIGHT_ANSWER_ANIMATION_DURATION}ms`,
        } as CSSProperties
      }
    />
  );
};
