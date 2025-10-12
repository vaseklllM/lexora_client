import { routes } from "@/shared/routes";
import { ButtonPlay as ButtonPlayShared } from "@/shared/ui/ButtonPlay";
import { useRouter } from "next/navigation";
import { ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    button: "h-12 w-12 md:h-12 md:w-12",
  },
});

interface Props {
  className?: string;
  deckId: string;
  isFinished?: boolean;
  isDisabled?: boolean;
}

export const ButtonPlay = (props: Props): ReactElement => {
  const classes = classesSlots();
  const router = useRouter();

  const clickHandler = useCallback(() => {
    router.push(routes.dashboard.learningDeck.url(props.deckId));
  }, [props.deckId, router]);

  return (
    <ButtonPlayShared
      className={classes.button({ className: props.className })}
      onClick={clickHandler}
      iconWidth="22px"
      iconHeight="22px"
      disabled={props.isDisabled}
      isFinished={props.isFinished}
    />
  );
};
