import { Language } from "@/api/schemas/language.schema";
import { Card, CardSide } from "@/entities/card";
import { InputLabeled } from "@/entities/input-labeled";
import { PlusIcon } from "@/shared/icons/Plus";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { memo, ReactElement, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    card: "",
    front: "flex h-full w-full items-center justify-center",
    buttonAdd: "btn btn-dash btn-primary rounded-full font-light",
    back: "flex h-full w-full flex-col justify-between",
    backContent: "flex flex-col justify-between gap-4 p-1",
    backContentLabel: "text-base-content/70 text-left text-xs",
    backContentInputWrapper: "mt-1",
    backContentInput: "",
    backButtons: "flex justify-between gap-2",
    backButtonCancel: "btn-dash",
    backButtonSave: "btn-dash",
  },
});

interface Props {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
}

export const AddCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  const classes = classesSlots();

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
            <PlusIcon />
          </button>
        </div>
      }
      back={
        <div className={classes.back()}>
          <div className={classes.backContent()}>
            <InputLabeled
              label="Word"
              labelClassName={classes.backContentLabel()}
              placeholder={`${props.languageWhatILearn.name}`}
              inputWrapperClassName={classes.backContentInputWrapper()}
              inputClassName={classes.backContentInput()}
              required
              actionButton={
                <ButtonIcon
                  icon="ai"
                  variant="ghost"
                  disabled={activeSide === "front"}
                />
              }
              disabled={activeSide === "front"}
            />
            <InputLabeled
              label="Translation"
              labelClassName={classes.backContentLabel()}
              placeholder={`${props.languageWhatIKnow.name}`}
              inputWrapperClassName={classes.backContentInputWrapper()}
              inputClassName={classes.backContentInput()}
              required
              actionButton={
                <ButtonIcon
                  icon="ai"
                  variant="ghost"
                  disabled={activeSide === "front"}
                />
              }
              disabled={activeSide === "front"}
            />
            <InputLabeled
              label="Example or description"
              labelClassName={classes.backContentLabel()}
              placeholder={`${props.languageWhatILearn.name} example`}
              inputWrapperClassName={classes.backContentInputWrapper()}
              inputClassName={classes.backContentInput()}
              disabled={activeSide === "front"}
            />
            <InputLabeled
              label="Example or description translation"
              labelClassName={classes.backContentLabel()}
              placeholder={`${props.languageWhatIKnow.name} example`}
              inputWrapperClassName={classes.backContentInputWrapper()}
              inputClassName={classes.backContentInput()}
              disabled={activeSide === "front"}
            />
          </div>
          <div className={classes.backButtons()}>
            <ButtonIcon
              className={classes.backButtonCancel()}
              icon="cancel"
              onClick={() => setActiveSide("front")}
              disabled={activeSide === "front"}
              variant="dash"
            />
            <ButtonIcon
              className={classes.backButtonSave()}
              icon="check"
              onClick={() => setActiveSide("front")}
              disabled={activeSide === "front"}
              variant="dash"
            />
          </div>
        </div>
      }
    />
  );
});

AddCard.displayName = "AddCard";
