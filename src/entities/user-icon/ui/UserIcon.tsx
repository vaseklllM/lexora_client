import Image from "next/image";
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
  avatarUrl?: string;
}

export const UserIcon = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <div className="bg-neutral text-neutral-content w-10 rounded-full">
        {props.avatarUrl ? (
          <Image
            src={props.avatarUrl}
            alt={props.userName}
            width={40}
            height={40}
            unoptimized
          />
        ) : (
          <span className="text-xl">{props.userName.charAt(0)}</span>
        )}
      </div>
    </div>
  );
};
