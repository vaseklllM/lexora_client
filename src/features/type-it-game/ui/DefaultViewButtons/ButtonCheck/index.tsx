import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore } from "../../../model/store";

const classesSlots = tv({
  slots: {
    button: "",
  },
});

interface Props {
  className?: string;
}

export const ButtonCheck = (props: Props): ReactElement => {
  const classes = classesSlots();
  const checkTranslation = useTypeItGameStore(
    (state) => state.checkTranslation,
  );
  const isDisabled = useTypeItGameStore((state) => state.isDisabledButtonCheck);
  const viewVariant = useTypeItGameStore((state) => state.viewVariant);

  return (
    <Button
      size="lg"
      color="primary"
      className={classes.button({ className: props.className })}
      onClick={() => {
        checkTranslation();
      }}
      disabled={isDisabled || viewVariant !== "default"}
    >
      Check
    </Button>
  );
};
