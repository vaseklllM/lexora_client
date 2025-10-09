import { GameType } from "@/shared/types/GameType";
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

export const ModalRepeatCardsType = (props: Props): ReactElement => {
  const classes = classesSlots();
  const chooseGameHandler = useCallback(
    (gameType: GameType) => () => {
      props.onClose();
      props.onChooseGameType?.(gameType);
    },
    [props.onChooseGameType, props.onClose],
  );

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
        <h3 className="text-center text-lg font-bold">Choose type of game</h3>
        <p className="text-base-content/70 mt-2 text-center text-sm">
          Choose the type of game you want to play.
        </p>
        <div className="mt-6 mb-4 flex flex-col items-center gap-4">
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("pairIt")}
          >
            Pair it
          </Button>
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("guessIt")}
          >
            Guess it
          </Button>
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("recallIt")}
          >
            Recall it
          </Button>
          <Button
            variant={btnVariant}
            color={btnColor}
            className={classes.button()}
            onClick={chooseGameHandler("typeIt")}
          >
            Type it
          </Button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={props.onClose}>close</button>
      </form>
    </dialog>
  );
};
