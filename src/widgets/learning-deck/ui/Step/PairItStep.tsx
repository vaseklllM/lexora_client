import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const PairItStep = (props: Props): ReactElement => {
  return <div className={props.className}>PairItStep</div>;
};
