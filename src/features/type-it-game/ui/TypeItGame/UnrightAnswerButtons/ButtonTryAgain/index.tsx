import { useTranslation } from "@/shared/hooks/useTranslation";
import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore } from "../../../../model/store";

const classesSlots = tv({
  slots: {
    button: "rounded-xl text-sm md:text-base",
  },
});

interface Props {
  className?: string;
}

export const ButtonTryAgain = (props: Props): ReactElement => {
  const classes = classesSlots();
  const { t } = useTranslation();
  const isDisabled = useTypeItGameStore(
    (state) => state.isDisabledButtonTryAgain,
  );

  const tryAgain = useTypeItGameStore((state) => state.tryAgain);

  return (
    <Button
      size="lg"
      color="primary"
      className={classes.button({ className: props.className })}
      onClick={() => {
        tryAgain();
      }}
      disabled={isDisabled}
      type="button"
    >
      {t("games.type_it.buttons.try_again")}
    </Button>
  );
};
