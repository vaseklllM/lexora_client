import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex items-center gap-2",
    name: "text-base-content/100 text-xl font-light",
    buttonEdit: "",
  },
});

interface Props {
  className?: string;
  text: string;
  onSave?: (text: string) => void;
}

export const EditableText = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <h2 className={classes.name()}>{props.text}</h2>
      <ButtonIcon icon="edit" className={classes.buttonEdit()} />
    </div>
  );
};
