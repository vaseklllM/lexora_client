import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const Checkbox = (props: Props): ReactElement => {
  return (
    <input {...props} type="checkbox" defaultChecked className="checkbox" />
  );
};
