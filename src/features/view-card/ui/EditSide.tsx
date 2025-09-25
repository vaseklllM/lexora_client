import { ICard } from "@/api/schemas/card.schema";
import { Language } from "@/api/schemas/language.schema";
import {
  CardFieldsSide,
  CardFieldsSideCancelHandler,
  CardFieldsSideProps,
  CardFieldsSideSubmitHandler,
} from "@/entities/card-fields-side";
import { sleep } from "@/shared/utils/sleep";
import { ReactElement, useCallback, useMemo } from "react";

interface Props {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
  isActiveThisSide: boolean;
  onOpenFront: () => void;
  card: ICard;
}

export const EditSide = (props: Props): ReactElement => {
  const onSubmit = useCallback<CardFieldsSideSubmitHandler>(async () => {
    props.onOpenFront();
  }, [props.onOpenFront]);

  const onCancel = useCallback<CardFieldsSideCancelHandler>(
    async ({ reset }) => {
      props.onOpenFront();
      await sleep(400);
      reset();
    },
    [props.onOpenFront],
  );

  const defaultValues = useMemo((): CardFieldsSideProps["defaultValues"] => {
    return {
      word: props.card.textInLearningLanguage,
      translation: props.card.textInKnownLanguage,
      example: props.card.descriptionInLearningLanguage,
      exampleTranslation: props.card.descriptionInKnownLanguage,
    };
  }, [props.card]);

  return (
    <CardFieldsSide
      languageWhatILearn={props.languageWhatILearn}
      languageWhatIKnow={props.languageWhatIKnow}
      isActiveThisSide={props.isActiveThisSide}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
    />
  );
};
