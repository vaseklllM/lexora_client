import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

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

  return (
    <Button
      size="lg"
      color="info"
      className={classes.button({ className: props.className })}
    >
      Help
    </Button>
  );
};
