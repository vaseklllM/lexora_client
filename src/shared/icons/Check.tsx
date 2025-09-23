import { ReactElement } from "react";

interface Props {
  className?: string;
  height?: string;
  width?: string;
}

export const CheckIcon = (props: Props): ReactElement => {
  return (
    <svg
      width={props.width || "24px"}
      height={props.height || "24px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
