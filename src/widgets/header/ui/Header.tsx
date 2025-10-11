import { Language } from "@/api/schemas/language.schema";
import { UserIcon } from "@/entities/user-icon";
import { HeaderMenu } from "@/features/header-menu";
import { UserLanguageSelect } from "@/features/user-language-select";
import { tv } from "tailwind-variants";
import { ButtonLogout } from "./ButtonLogout";

const classesSlots = tv({
  slots: {
    header: "flex items-center justify-between p-4",
    user: "flex items-center gap-2",
    right: "flex items-center gap-4",
    headerMenu: "flex sm:hidden",
    menu: "flex flex-col items-center justify-center gap-2",
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
          className="select-sm hidden sm:block"
          type="icon_button"
        />
        <ButtonLogout className="hidden sm:block" />
        <HeaderMenu className={classes.headerMenu()}>
          <div className={classes.menu()}>
            <UserLanguageSelect
              allLanguages={props.allLanguages}
              userLanguage={props.userLanguage}
              type="select"
            />
            <div className="divider m-0 h-0.5 w-full" />
            <ButtonLogout className="w-full" />
          </div>
        </HeaderMenu>
      </div>
    </div>
  );
};
