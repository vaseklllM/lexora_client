import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const iconClasses = tv({
  base: "fill-base-content/60",
});

interface Props {
  className?: string;
}

export const FolderIcon = (props: Props): ReactElement => {
  return (
    <svg
      className={iconClasses(props)}
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      enableBackground="new 0 0 24 24"
    >
      <g>
        <rect fill="none" height="24" width="24"></rect>
      </g>
      <g>
        <g>
          <g>
            <path d="M10,4H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2h-8L10,4z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
