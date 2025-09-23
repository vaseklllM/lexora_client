"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Input } from "@/shared/ui/Input";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "relative flex w-fit items-center gap-2",
    name: "text-base-content/100 text-xl font-light",
    nameInput: "",
    buttonEdit: "",
    buttonCancel: "",
    buttonCheck: "",
    loader:
      "loading loading-spinner loading-sm text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  variants: {
    isLoading: {
      true: {
        name: "opacity-30",
        nameInput: "opacity-30",
        buttonEdit: "opacity-30",
        buttonCancel: "opacity-30",
        buttonCheck: "opacity-30",
      },
    },
  },
});

interface Props {
  className?: string;
  text: string;
  onSave?: (args: { text: string }) => Promise<void>;
  placeholder?: string;
}

export const EditableText = (props: Props): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);
  const [isLoading, setIsLoading] = useState(false);

  const classes = classesSlots({ isLoading });

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const cancelHandler = useCallback(() => {
    setIsEditing(false);
    setText(props.text);
  }, [setIsEditing, setText, props.text]);

  const saveHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await props.onSave?.({ text: text.trim() });
      setIsEditing(false);
      setText(text.trim());
    } finally {
      setIsLoading(false);
    }
  }, [props.onSave, text, setIsLoading, setIsEditing]);

  return (
    <div className={classes.base({ className: props.className })}>
      {isEditing ? (
        <>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={props.placeholder}
            disabled={isLoading}
            className={classes.nameInput()}
            key="input"
          />
          <ButtonIcon
            icon="cancel"
            key="cancel"
            className={classes.buttonCancel()}
            onClick={cancelHandler}
            disabled={isLoading}
          />
          <ButtonIcon
            icon="check"
            key="check"
            className={classes.buttonCheck()}
            onClick={saveHandler}
            disabled={text === props.text || text.trim() === "" || isLoading}
          />
        </>
      ) : (
        <>
          <h2 key="name" className={classes.name()}>
            {props.text}
          </h2>
          <ButtonIcon
            icon="edit"
            key="edit"
            className={classes.buttonEdit()}
            onClick={startEditing}
          />
        </>
      )}
      {isLoading && <span className={classes.loader()}></span>}
    </div>
  );
};
