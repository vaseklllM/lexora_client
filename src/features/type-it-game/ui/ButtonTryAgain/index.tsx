import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore } from "../../model/store";

const classesSlots = tv({
  slots: {
    button: "",
  },
});

interface Props {
  className?: string;
}

export const ButtonTryAgain = (props: Props): ReactElement => {
  const classes = classesSlots();

  const isDisabled = useTypeItGameStore(
    (state) => state.isDisabledButtonTryAgain,
  );

  return (
    <Button
      size="lg"
      color="primary"
      className={classes.button({ className: props.className })}
      // onClick={() => {}}
      disabled={isDisabled}
    >
      Try again
    </Button>
  );
};
