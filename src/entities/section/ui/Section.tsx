import { Folder, IFolder } from "@/entities/folder";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 rounded-xl p-4 pr-5 pl-5 shadow-md",
    title: "text-base-content/70 text-2xl font-bold",
    folders:
      "mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  },
});

interface Props {
  className?: string;
  title: string;
  folders?: IFolder[];
}

export const Section = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <h1 className={classes.title()}>{props.title}</h1>
      {props.folders && (
        <div className={classes.folders()}>
          {props.folders.map((folder) => (
            <Folder key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
};
