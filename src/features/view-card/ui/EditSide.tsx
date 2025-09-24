import { Language } from "@/api/schemas/language.schema";
import {
  CardFieldsSide,
  CardFieldsSideCancelHandler,
  CardFieldsSideSubmitHandler,
} from "@/entities/card-fields-side";
import { sleep } from "@/shared/utils/sleep";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
  isActiveThisSide: boolean;
  onOpenFront: () => void;
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

  return (
    <CardFieldsSide
      languageWhatILearn={props.languageWhatILearn}
      languageWhatIKnow={props.languageWhatIKnow}
      isActiveThisSide={props.isActiveThisSide}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};
