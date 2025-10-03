import { ICard } from "@/api/schemas/card.schema";
import { Language } from "@/api/schemas/language.schema";
import { Card, CardSide } from "@/entities/card";
import { ViewCard as ViewCardEntity } from "@/entities/view-card";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { sleep } from "@/shared/utils/sleep";
import { memo, ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import { DeleteSide } from "./DeleteSide";
import { EditSide } from "./EditSide";

const classesSlots = tv({
  slots: {
    base: "",
  },
});

interface Props {
  className?: string;
  card: ICard;
  deckId: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
}

export const ViewCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");
  const [backSide, setBackSide] = useState<"delete" | "edit">();

  const classes = classesSlots();

  const deleteHandler = useCallback(() => {
    setBackSide("delete");
    setActiveSide("back");
  }, [setBackSide, setActiveSide]);

  const editHandler = useCallback(() => {
    setBackSide("edit");
    setActiveSide("back");
  }, [setBackSide, setActiveSide]);

  const openFrontHandler = useCallback(async () => {
    setActiveSide("front");
    await sleep(400);
    setBackSide(undefined);
  }, [setActiveSide, setBackSide]);

  return (
    <Card
      className={classes.base({ className: props.className })}
      activeSide={activeSide}
      onSideChange={setActiveSide}
      front={
        <ViewCardEntity
          card={props.card}
          iconButtons={
            <>
              <ButtonIcon
                icon="edit"
                variant="dash"
                color="primary"
                onClick={editHandler}
                // className="h-10 w-10 md:h-8 md:w-8"
              />
              <ButtonIcon
                icon="delete"
                variant="dash"
                color="error"
                // className="h-10 w-10 md:h-8 md:w-8"
                onClick={deleteHandler}
              />
            </>
          }
        />
      }
      back={
        <>
          {backSide === "delete" && (
            <DeleteSide
              deckId={props.deckId}
              setActiveSide={setActiveSide}
              card={props.card}
            />
          )}
          {backSide === "edit" && (
            <EditSide
              languageWhatILearn={props.languageWhatILearn}
              languageWhatIKnow={props.languageWhatIKnow}
              isActiveThisSide={activeSide === "back"}
              onOpenFront={openFrontHandler}
              card={props.card}
              deckId={props.deckId}
            />
          )}
        </>
      }
    />
  );
});

ViewCard.displayName = "AddCard";
