import { Language } from "@/api/schemas/language.schema";
import { UserIcon } from "@/entities/user-icon";
import { UserLanguageSelect } from "@/features/user-language-select";
import { tv } from "tailwind-variants";
import { ButtonLogout } from "./ButtonLogout";

const classesSlots = tv({
  slots: {
    header: "flex items-center justify-between p-4",
    user: "flex items-center gap-2",
    right: "flex items-center gap-4",
  },
});

interface Props {
  userName: string;
  avatarUrl?: string;
  allLanguages: Language[];
  userLanguage: Language;
}

export const Header = (props: Props) => {
  const classes = classesSlots();

  return (
    <div className={classes.header()}>
      <div className={classes.user()}>
        <UserIcon userName={props.userName} avatarUrl={props.avatarUrl} />
        <p className="text-base-content/90">{props.userName}</p>
      </div>
      <div className={classes.right()}>
        <UserLanguageSelect
          allLanguages={props.allLanguages}
          userLanguage={props.userLanguage}
        />
        <ButtonLogout />
      </div>
    </div>
  );
};
