import { AnimatePresence, motion } from "motion/react";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore } from "../../model/store";
import { ButtonCheck } from "../ButtonCheck";
import { ButtonHelp } from "../ButtonHelp";
import { ButtonRight } from "../ButtonRight";
import { ButtonTryAgain } from "../ButtonTryAgain";

const classesSlots = tv({
  slots: {
    buttons:
      "mt-4 grid w-full grid-cols-2 gap-4 transition-opacity duration-1000 md:mt-24 md:w-max",
    button: "md:min-w-48",
  },
});

const variants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

interface Props {
  className?: string;
}

export const Buttons = (props: Props): ReactElement => {
  const classes = classesSlots();
  const buttonsVariant = useTypeItGameStore((state) => state.buttonsVariant);

  return (
    <AnimatePresence mode="wait">
      {buttonsVariant === "default" && (
        <motion.div
          key="A"
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <div className={classes.buttons({ className: props.className })}>
            <ButtonHelp className={classes.button()} />
            <ButtonCheck className={classes.button()} />
          </div>
        </motion.div>
      )}
      {buttonsVariant === "unrightAnswer" && (
        <motion.div
          key="B"
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <div className={classes.buttons({ className: props.className })}>
            <ButtonRight className={classes.button()} />
            <ButtonTryAgain className={classes.button()} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
