import { Input } from "@/shared/ui/Input";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore } from "../model/store";

const classesSlots = tv({
  slots: {
    base: "",
    input: "py-4 text-center",
  },
});

interface Props {
  className?: string;
}

export const InputField = (props: Props): ReactElement => {
  const classes = classesSlots();
  const translationInput = useTypeItGameStore(
    (state) => state.translationInput,
  );
  const setTranslationInput = useTypeItGameStore(
    (state) => state.setTranslationInput,
  );

  return (
    <Input
      className={classes.base({ className: props.className })}
      inputClassName={classes.input()}
      placeholder="Type the translation"
      value={translationInput}
      onChange={(e) => setTranslationInput(e.target.value)}
    />
  );
};
