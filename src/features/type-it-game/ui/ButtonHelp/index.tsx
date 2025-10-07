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

export const ButtonHelp = (props: Props): ReactElement => {
  const classes = classesSlots();
  const isDisabledButtons = useTypeItGameStore(
    (state) => state.isDisabledButtons,
  );

  return (
    <Button
      size="lg"
      color="info"
      className={classes.button({ className: props.className })}
      disabled={isDisabledButtons}
    >
      Help
    </Button>
  );
};
