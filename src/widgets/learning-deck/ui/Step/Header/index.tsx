import {
  Step,
  useLearningDeckStore,
} from "@/widgets/learning-deck/model/store";
import { AnimatePresence, motion } from "motion/react";
import { ReactElement } from "react";
import { StepsHeader } from "./StepsHeader";

export const Header = (): ReactElement => {
  const isLearning = useLearningDeckStore(
    (state) => state.activeStep !== Step.START,
  );

  return (
    <AnimatePresence initial={false}>
      {isLearning && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          key="stepsHeader"
        >
          <StepsHeader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
