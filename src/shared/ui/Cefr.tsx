import { Cefr } from "@/api/schemas/card.schema";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    cefr: "flex h-8 w-8 items-center justify-center rounded-full border-1 text-sm",
  },
});

interface Props {
  className?: string;
  cefr: Cefr;
}

export const Cerf = (props: Props): ReactElement => {
  const { cefr, className } = props;

  const classes = classesSlots();

  return (
    <p
      className={classes.cefr({
        className: [className, getCerfColor(cefr).text],
      })}
    >
      {cefr}
    </p>
  );
};

function getCerfColor(cefr: Cefr): { text: string } {
  switch (cefr) {
    case Cefr.A1:
      return {
        text: "text-green-400",
      };

    case Cefr.A2:
      return {
        text: "text-lime-400",
      };

    case Cefr.B1:
      return {
        text: "text-amber-400",
      };

    case Cefr.B2:
      return {
        text: "text-orange-400",
      };

    case Cefr.C1:
      return {
        text: "text-orange-600",
      };

    case Cefr.C2:
      return {
        text: "text-red-700",
      };

    default: {
      const _check: never = cefr;
      throw new Error(`Unhandled cefr type: ${_check}`);
    }
  }
}
