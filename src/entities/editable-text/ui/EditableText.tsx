"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Input } from "@/shared/ui/Input";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex items-center gap-2",
    name: "text-base-content/100 text-xl font-light",
    buttonEdit: "",
    buttonCancel: "text-error",
  },
});

interface Props {
  className?: string;
  text: string;
  onSave?: (text: string) => void;
  placeholder?: string;
}

export const EditableText = (props: Props): ReactElement => {
  const classes = classesSlots();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const cancelHandler = useCallback(() => {
    setIsEditing(false);
    setText(props.text);
  }, [setIsEditing, setText, props.text]);

  return (
    <div className={classes.base({ className: props.className })}>
      {isEditing ? (
        <>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={props.placeholder}
          />
          <ButtonIcon
            icon="cancel"
            className={classes.buttonCancel()}
            onClick={cancelHandler}
          />
          <ButtonIcon
            icon="save"
            // className={classes.buttonSave()}
            // onClick={save}
            disabled={text === props.text || text.trim() === ""}
          />
        </>
      ) : (
        <>
          <h2 className={classes.name()}>{props.text}</h2>
          <ButtonIcon
            icon="edit"
            className={classes.buttonEdit()}
            onClick={startEditing}
          />
        </>
      )}
    </div>
  );
};
