import { ReactElement } from "react";

interface Props {
  className?: string;
  height?: string;
  width?: string;
}

export const ArrowIcon = (props: Props): ReactElement => {
  return (
    <svg
      width={props.width || "24px"}
      height={props.height || "24px"}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12H18M6 12L11 7M6 12L11 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
