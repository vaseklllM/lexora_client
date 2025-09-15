import { DeleteIcon } from "@/shared/icons/Delete";
import { EditIcon } from "@/shared/icons/Edit";
import { DottedIconButton as DottedButtonComponent } from "@/shared/ui/DottedIconButton";
import { ReactElement, useId } from "react";
import { tv } from "tailwind-variants";

type IconType = "edit" | "delete";

export type DropdownItem = {
  type: "button";
  id: number | string;
  label: string;
  onClick: () => void;
  icon?: IconType;
};

interface Props {
  className?: string;
  items: DropdownItem[];
}

export const DropdownButton = (props: Props): ReactElement => {
  const id = useId();
  const popoverId = `popover-${id}`;
  const anchorName = `--anchor-${id}`;

  return (
    <div className={props.className}>
      <DottedButtonComponent
        className="btn"
        popoverTarget={popoverId}
        anchorName={anchorName}
      />
      <ul
        className="dropdown dropdown-end menu rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id={popoverId}
        style={{ positionAnchor: anchorName } as React.CSSProperties}
      >
        {props.items.map((item) => (
          <li key={item.id}>
            <button className="group" onClick={item.onClick}>
              {item.icon && <Icon icon={item.icon} />}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const iconClasses = tv({
  base: "fill-base-content/80 duration-200 group-active:fill-white/90",
});

function Icon(props: { icon: IconType }) {
  switch (props.icon) {
    case "edit":
      return <EditIcon className={iconClasses()} />;

    case "delete":
      return <DeleteIcon className={iconClasses()} />;
  }
}
