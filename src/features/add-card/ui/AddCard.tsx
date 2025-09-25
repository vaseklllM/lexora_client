import { createCard } from "@/api/card/create-card";
import { revalidateGetDeck } from "@/api/deck/get-deck";
import { Language } from "@/api/schemas/language.schema";
import { Card, CardSide } from "@/entities/card";
import {
  CardFieldsSide,
  CardFieldsSideCancelHandler,
  CardFieldsSideSubmitHandler,
} from "@/entities/card-fields-side";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import { PlusIcon } from "@/shared/icons/Plus";
import { sleep } from "@/shared/utils/sleep";
import { memo, ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    card: "",
    front: "flex h-full w-full items-center justify-center",
    buttonAdd: "btn btn-dash btn-primary rounded-full font-light",
  },
});

interface Props {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
  deckId: string;
}

export const AddCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  const classes = classesSlots();

  const onSubmit: CardFieldsSideSubmitHandler = useCallback(
    async ({ inputs, reset, setError }) => {
      const result = await createCard({
        deckId: props.deckId,
        textInKnownLanguage: inputs.translation,
        textInLearningLanguage: inputs.word,
        descriptionInKnownLanguage: inputs.exampleTranslation,
        descriptionInLearningLanguage: inputs.example,
      });

      if (result.ok) {
        await sleep(1000);
        await revalidateGetDeck(props.deckId);
        reset();
      } else {
        switch (result.data.statusCode) {
          case ErrorStatus.BAD_REQUEST: {
            parseBadRequestErrors(
              result.data.errors,
              ({ field, firstError }) => {
                switch (field) {
                  case "textInKnownLanguage": {
                    setError("word", { message: firstError });
                    break;
                  }
                  case "textInLearningLanguage": {
                    setError("translation", { message: firstError });
                    break;
                  }

                  case "descriptionInKnownLanguage": {
                    setError("example", { message: firstError });
                    break;
                  }
                  case "descriptionInLearningLanguage": {
                    setError("exampleTranslation", { message: firstError });
                    break;
                  }
                }
              },
            );
            break;
          }
        }
      }
    },
    [props.deckId],
  );

  const cancelHandler = useCallback<CardFieldsSideCancelHandler>(
    async ({ reset }) => {
      setActiveSide("front");
      await sleep(400);
      reset();
    },
    [setActiveSide],
  );

  return (
    <Card
      className={classes.card({ className: props.className })}
      activeSide={activeSide}
      onSideChange={setActiveSide}
      front={
        <div className={classes.front()}>
          <button
            className={classes.buttonAdd()}
            onClick={() => setActiveSide("back")}
            disabled={activeSide === "back"}
          >
            Add Card
            <PlusIcon height="22px" width="22px" />
          </button>
        </div>
      }
      back={
        <CardFieldsSide
          languageWhatILearn={props.languageWhatILearn}
          languageWhatIKnow={props.languageWhatIKnow}
          isActiveThisSide={activeSide === "back"}
          onSubmit={onSubmit}
          onCancel={cancelHandler}
          deckId={props.deckId}
        />
      }
    />
  );
});

AddCard.displayName = "AddCard";
