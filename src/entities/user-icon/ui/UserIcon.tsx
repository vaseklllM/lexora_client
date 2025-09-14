import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "avatar avatar-placeholder",
  },
});

interface Props {
  className?: string;
  userName: string;
}

export const UserIcon = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <div className="bg-neutral text-neutral-content w-10 rounded-full">
        <span className="text-xl">{props.userName.charAt(0)}</span>
      </div>
    </div>
  );
};
