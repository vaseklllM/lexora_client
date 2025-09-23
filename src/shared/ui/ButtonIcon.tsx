import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { EditIcon } from "../icons/Edit";

const classesSlots = tv({
  slots: {
    button: "btn btn-ghost h-8 w-8 rounded-full p-0",
    icon: "text-base-content/60",
  },
});

interface Props {
  className?: string;
  icon: "edit";
}

export const ButtonIcon = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <button className={classes.button({ className: props.className })}>
      <Icon icon={props.icon} className={classes.icon()} />
    </button>
  );
};

function Icon(props: Pick<Props, "icon" | "className">) {
  switch (props.icon) {
    case "edit":
      return <EditIcon className={props.className} />;
  }
}
