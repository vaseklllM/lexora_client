import { tv } from "tailwind-variants";
import { ButtonLogout } from "./ButtonLogout";

const classesSlots = tv({
  slots: {
    header: "flex items-center justify-between p-4",
  },
});

interface Props {
  userName: string;
}

export const Header = (props: Props) => {
  const classes = classesSlots();

  return (
    <div className={classes.header()}>
      <p className="text-base-content/90">{props.userName}</p>
      <ButtonLogout />
    </div>
  );
};
