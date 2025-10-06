import { CefrEnum } from "@/api/schemas/card.schema";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    cefr: "flex h-8 w-8 items-center justify-center rounded-full border-1 text-sm opacity-80",
  },
});

interface Props {
  className?: string;
  cefr: CefrEnum;
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

function getCerfColor(cefr: CefrEnum): { text: string } {
  switch (cefr) {
    case CefrEnum.A1:
      return {
        text: "text-green-400",
      };

    case CefrEnum.A2:
      return {
        text: "text-lime-400",
      };

    case CefrEnum.B1:
      return {
        text: "text-amber-400",
      };

    case CefrEnum.B2:
      return {
        text: "text-orange-400",
      };

    case CefrEnum.C1:
      return {
        text: "text-orange-600",
      };

    case CefrEnum.C2:
      return {
        text: "text-red-700",
      };

    default: {
      const _check: never = cefr;
      throw new Error(`Unhandled cefr type: ${_check}`);
    }
  }
}
