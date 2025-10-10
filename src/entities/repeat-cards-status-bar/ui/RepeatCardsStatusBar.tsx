import { GameCardsControllerResult } from "@/shared/hooks/useGameCardsController";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex flex-row justify-between gap-2",
    item: "bg-base-content/20 flex h-1 w-full min-w-1 rounded-full",
  },
  variants: {
    status: {
      finished: {
        item: "bg-success",
      },
      mistake: {
        item: "bg-error",
      },
    },
    isActive: {
      true: {
        item: "after:border-primary-content/60 relative after:absolute after:top-[-4px] after:left-[-4px] after:h-[calc(100%+8px)] after:w-[calc(100%+8px)] after:rounded-full after:border-[1px] after:p-[1px]",
      },
    },
  },
});

interface Props extends Pick<GameCardsControllerResult, "cardsMap"> {
  className?: string;
}

export const RepeatCardsStatusBar = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <ul className={classes.base({ className: props.className })}>
      {props.cardsMap.map((i) => (
        <li
          key={i.card.id}
          className={classes.item({
            status: i.status,
            isActive: i.isActive,
          })}
        />
      ))}
    </ul>
  );
};
