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

export const ButtonHelp = (props: Props): ReactElement => {
  const classes = classesSlots();
  const isDisabled = useTypeItGameStore((state) => state.isDisabledButtonHelp);
  const viewVariant = useTypeItGameStore((state) => state.viewVariant);
  const help = useTypeItGameStore((state) => state.help);

  return (
    <Button
      size="lg"
      color="primary"
      variant="outline"
      className={classes.button({ className: props.className })}
      disabled={isDisabled || viewVariant !== "default"}
      onClick={() => {
        help();
      }}
    >
      Help
    </Button>
  );
};
