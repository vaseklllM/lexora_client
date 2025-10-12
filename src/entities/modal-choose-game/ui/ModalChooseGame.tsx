import { useTranslation } from "@/shared/hooks/useTranslation";
import { GameType } from "@/shared/types/Game";
import { Button } from "@/shared/ui/Button";
import { ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "modal",
    button: "btn-lg w-50 rounded-xl",
  },
});

const btnVariant = "outline";
const btnColor = "primary";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onChooseGameType?: (gameType: GameType) => void;
}

export const ModalChooseGame = (props: Props): ReactElement => {
  const classes = classesSlots();
  const chooseGameHandler = useCallback(
    (gameType: GameType) => () => {
      props.onClose();
      props.onChooseGameType?.(gameType);
    },
    [props.onChooseGameType, props.onClose],
  );
  const { t } = useTranslation();

  return (
    <dialog
      className={classes.base({ className: props.className })}
      open={props.isOpen}
      onClose={props.onClose}
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={props.onClose}
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
          >
            ✕
          </button>
        </form>
        <h3 className="text-center text-lg font-bold">
          {t("modal.choose_game.title")}
        </h3>
        <p className="text-base-content/70 mt-2 text-center text-sm">
          {t("modal.choose_game.description")}
        </p>
        <div className="mt-6 mb-4 flex flex-col items-center gap-4">
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("pairIt")}
          >
            {t("modal.choose_game.buttons.pair_it")}
          </Button>
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("guessIt")}
          >
            {t("modal.choose_game.buttons.guess_it")}
          </Button>
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("recallIt")}
          >
            {t("modal.choose_game.buttons.recall_it")}
          </Button>
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("typeIt")}
          >
            {t("modal.choose_game.buttons.type_it")}
          </Button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={props.onClose}>close</button>
      </form>
    </dialog>
  );
};
