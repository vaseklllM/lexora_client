import { ReactElement } from "react";

interface Props {
  className?: string;
  children: ReactElement;
}

export const ModalRenderController = (props: Props): ReactElement => {
  return <>{props.children}</>;
};
