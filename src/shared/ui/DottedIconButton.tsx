import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    button: "btn btn-ghost h-8 w-8 rounded-full p-0",
  },
});

interface Props {
  className?: string;
  popoverTarget: string;
  anchorName: string;
}

export const DottedIconButton = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <button
      className={classes.button({ className: props.className })}
      popoverTarget={props.popoverTarget}
      style={{ anchorName: props.anchorName } as React.CSSProperties}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <svg
        className="fill-base-content/60"
        width="16"
        height="16"
        viewBox="0 0 20 20"
        focusable="false"
      >
        <path d="M10 6c.82 0 1.5-.68 1.5-1.5S10.82 3 10 3s-1.5.67-1.5 1.5S9.18 6 10 6zm0 5.5c.82 0 1.5-.68 1.5-1.5s-.68-1.5-1.5-1.5-1.5.68-1.5 1.5.68 1.5 1.5 1.5zm0 5.5c.82 0 1.5-.67 1.5-1.5 0-.82-.68-1.5-1.5-1.5s-1.5.68-1.5 1.5c0 .83.68 1.5 1.5 1.5z"></path>
      </svg>
    </button>
  );
};
