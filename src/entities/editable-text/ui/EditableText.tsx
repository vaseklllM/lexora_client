"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Input } from "@/shared/ui/Input";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import { EditableTextError } from "../model/EditableTextError";

const classesSlots = tv({
  slots: {
    base: "relative flex w-fit gap-2",
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
    isEditing: {
      true: {
        buttonEdit: "mt-[2px]",
        buttonCancel: "mt-[2px]",
        buttonCheck: "mt-[2px]",
      },
      false: {
        base: "items-center",
      },
    },
  },
});

export type EditableTextSaveHandler = (text: string) => Promise<void>;

interface Props {
  className?: string;
  text: string;
  onSave?: EditableTextSaveHandler;
  placeholder?: string;
}

export const EditableText = (props: Props): ReactElement => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(props.text);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const classes = classesSlots({ isLoading, isEditing });

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const cancelHandler = useCallback(() => {
    setIsEditing(false);
    setText(props.text);
    setError(undefined);
  }, [setIsEditing, setText, props.text, setError]);

  const saveHandler = useCallback(async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await props.onSave?.(text.trim());
      setIsEditing(false);
      setText(text.trim());
    } catch (error) {
      if (error instanceof EditableTextError) {
        setError(error.message);
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  }, [props.onSave, text, setIsLoading, setIsEditing, setError]);

  const changeNameHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      setError(undefined);
    },
    [setText, setError],
  );

  const isDisabledSaving =
    text === props.text || text.trim() === "" || isLoading;

  return (
    <div className={classes.base({ className: props.className })}>
      {isEditing ? (
        <>
          <Input
            value={text}
            onChange={changeNameHandler}
            placeholder={props.placeholder}
            disabled={isLoading}
            className={classes.nameInput()}
            key="input"
            error={error}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabledSaving) {
                saveHandler();
              }
            }}
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
            disabled={isDisabledSaving}
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
