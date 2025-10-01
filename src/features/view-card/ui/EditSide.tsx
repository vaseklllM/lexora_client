import { updateCard } from "@/api/card/update-card";
import { revalidateGetDeck } from "@/api/deck/get-deck";
import { ICard } from "@/api/schemas/card.schema";
import { Language } from "@/api/schemas/language.schema";
import {
  CardFieldsSide,
  CardFieldsSideCancelHandler,
  CardFieldsSideProps,
  CardFieldsSideSubmitHandler,
} from "@/entities/card-fields-side";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import { sleep } from "@/shared/utils/sleep";
import { ReactElement, useCallback, useMemo } from "react";

interface Props {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
  isActiveThisSide: boolean;
  onOpenFront: () => void;
  card: ICard;
  deckId: string;
}

export const EditSide = (props: Props): ReactElement => {
  const defaultValues = useMemo((): CardFieldsSideProps["defaultValues"] => {
    return {
      word: props.card.textInLearningLanguage,
      translation: props.card.textInKnownLanguage,
      example: props.card.descriptionInLearningLanguage,
      exampleTranslation: props.card.descriptionInKnownLanguage,
      cefr: props.card.cefr,
    };
  }, [
    props.card.textInLearningLanguage,
    props.card.textInKnownLanguage,
    props.card.descriptionInLearningLanguage,
    props.card.descriptionInKnownLanguage,
    props.card.cefr,
  ]);

  const onSubmit = useCallback<CardFieldsSideSubmitHandler>(
    async ({ inputs, setError }) => {
      if (
        inputs.word === defaultValues?.word &&
        inputs.translation === defaultValues?.translation &&
        inputs.example === defaultValues?.example &&
        inputs.exampleTranslation === defaultValues?.exampleTranslation &&
        inputs.cefr === defaultValues?.cefr
      ) {
        props.onOpenFront();
        return;
      }

      const result = await updateCard({
        cardId: props.card.id,
        textInKnownLanguage: inputs.translation,
        textInLearningLanguage: inputs.word,
        descriptionInKnownLanguage: inputs.exampleTranslation,
        descriptionInLearningLanguage: inputs.example,
        cefr: inputs.cefr,
      });

      if (result.ok) {
        await revalidateGetDeck(props.deckId);
        props.onOpenFront();
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

      props.onOpenFront();
    },
    [props.onOpenFront, defaultValues, props.card.id, props.deckId],
  );

  const onCancel = useCallback<CardFieldsSideCancelHandler>(
    async ({ reset }) => {
      props.onOpenFront();
      await sleep(400);
      reset();
    },
    [props.onOpenFront],
  );

  return (
    <CardFieldsSide
      languageWhatILearn={props.languageWhatILearn}
      languageWhatIKnow={props.languageWhatIKnow}
      isActiveThisSide={props.isActiveThisSide}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      deckId={props.deckId}
    />
  );
};
