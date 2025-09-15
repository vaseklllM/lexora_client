import { Button } from "@/shared/ui/Button";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  cancelButtonText?: string;
  agreeButtonText?: string;
}

export const ModalAgree = (props: Props): ReactElement => {
  const closeHandler = useCallback(() => {
    props.setIsOpen(false);
  }, [props.setIsOpen]);

  return (
    <dialog className="modal" open={props.isOpen} onClose={closeHandler}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{props.title}</h3>
        <p className="py-4">{props.description}</p>
        <div className="flex justify-end gap-4">
          <Button className="btn-soft" onClick={closeHandler}>
            {props.cancelButtonText}
          </Button>
          <Button className="btn-error">{props.agreeButtonText}</Button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeHandler}>close</button>
      </form>
    </dialog>
  );
};
