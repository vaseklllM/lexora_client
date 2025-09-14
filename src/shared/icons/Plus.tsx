import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const Plus = (props: Props): ReactElement => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      viewBox="0 0 50 50"
      enableBackground="new 0 0 50 50"
      className={props.className}
    >
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="25"
        y1="10.5"
        x2="25"
        y2="39.5"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="39.5"
        y1="25"
        x2="10.5"
        y2="25"
      />
    </svg>
  );
};
