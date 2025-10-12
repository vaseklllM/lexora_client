import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore } from "../../../../model/store";
import { useTranslation } from "@/shared/hooks/useTranslation";

const classesSlots = tv({
  slots: {
    button: "rounded-xl",
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
  const { t } = useTranslation();

  return (
    <Button
      size="lg"
      color="primary"
      className={classes.button({ className: props.className })}
      onClick={() => {
        checkTranslation();
      }}
      disabled={isDisabled || viewVariant !== "default"}
      type="button"
    >
      {t("games.type_it.buttons.check")}
    </Button>
  );
};
