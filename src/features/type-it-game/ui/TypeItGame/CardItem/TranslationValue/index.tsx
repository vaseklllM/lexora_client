import { useActiveCard } from "@/features/type-it-game/hooks/useActiveCard";
import { useTypeItGameStore } from "@/features/type-it-game/model/store";
import { toClearWord } from "@/features/type-it-game/model/toClearWord";
import { ReactElement, useMemo } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "text-center text-xl font-light break-words",
    unCorrect: "text-error",
  },
});

interface Props {
  className?: string;
}

export const TranslationValue = (props: Props): ReactElement => {
  const classes = classesSlots({});

  const translation = useActiveCard((card) => card.textInLearningLanguage);
  const translationsList = useMemo(
    () => translation.split(",").map((word) => toClearWord(word)),
    [translation],
  );

  const translationInput = useTypeItGameStore(
    (state) => state.translationInput,
  );

  const [left, right] = useMemo(() => {
    const left = translationsList
      .map((word) => {
        let sameSymbols: string = "";

        for (let i = 0; i < translationInput.length; i++) {
          if (!word[i] || !translationInput[i]) return sameSymbols;

          if (word[i].toLowerCase() === translationInput[i].toLowerCase()) {
            sameSymbols += translationInput[i];
          } else {
            return sameSymbols;
          }
        }

        return sameSymbols;
      })
      .sort((a, b) => b.length - a.length)[0];

    return [left, translationInput.slice(left.length)];
  }, [translationsList, translationInput]);

  return (
    <h3 className={classes.base({ className: props.className })}>
      {left}
      <span className={classes.unCorrect()}>{right || "...?"}</span>
    </h3>
  );
};
