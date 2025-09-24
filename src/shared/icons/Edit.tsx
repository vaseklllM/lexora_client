import { ReactElement } from "react";

interface Props {
  className?: string;
  height?: string;
  width?: string;
}

export const EditIcon = (props: Props): ReactElement => {
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
        d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
