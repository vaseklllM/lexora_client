import { useNextCardHandler } from "@/features/type-it-game/hooks/useNextCardHandler";
import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore } from "../../../model/store";

const classesSlots = tv({
  slots: {
    button: "rounded-xl",
  },
});

interface Props {
  className?: string;
}

export const ButtonRight = (props: Props): ReactElement => {
  const classes = classesSlots();

  const isDisabled = useTypeItGameStore((state) => state.isDisabledButtonRight);
  const nextCardHandler = useNextCardHandler();

  return (
    <Button
      size="lg"
      variant="outline"
      color="primary"
      className={classes.button({ className: props.className })}
      onClick={() => {
        nextCardHandler?.();
      }}
      disabled={isDisabled}
      type="button"
    >
      Right
    </Button>
  );
};
