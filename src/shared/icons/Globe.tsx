import { ReactElement } from "react";

interface Props {
  className?: string;
  height?: string;
  width?: string;
}

export const GlobeIcon = (props: Props): ReactElement => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={props.height || "24px"}
      width={props.width || "24px"}
    >
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="1"
        fill="none"
        stroke="currentColor"
        d="M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.761 0 3.941-5.163 3.941-9S14.761 3 12 3m0 18c-2.761 0-3.941-5.163-3.941-9S9.239 3 12 3M3.5 9h17m-17 6h17"
      ></path>
    </svg>
  );
};
