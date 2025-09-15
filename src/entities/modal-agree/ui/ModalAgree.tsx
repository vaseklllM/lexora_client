import { Button } from "@/shared/ui/Button";
import { sleep } from "@/shared/utils/sleep";
import { ReactElement, useCallback } from "react";

export type ModalAgreeOnAgree = (args: {
  closeModal: () => Promise<void>;
}) => void | Promise<void>;

interface ModalAgreeProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  description?: string;
  cancelButtonText?: string;
  agreeButtonText?: string;
  onAgree?: ModalAgreeOnAgree;
}

export const ModalAgree = (props: ModalAgreeProps): ReactElement => {
  const closeHandler = useCallback(() => {
    props.setIsOpen(false);
  }, [props.setIsOpen]);

  const agreeHandler = useCallback(async () => {
    await props.onAgree?.({
      closeModal: async () => {
        closeHandler();
        await sleep(200);
      },
    });
  }, [props.onAgree, closeHandler]);

  return (
    <dialog className="modal" open={props.isOpen} onClose={closeHandler}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{props.title}</h3>
        <p className="py-4">{props.description}</p>
        <div className="flex justify-end gap-4">
          <Button className="btn-soft" onClick={closeHandler}>
            {props.cancelButtonText}
          </Button>
          <Button className="btn-error" onClick={agreeHandler}>
            {props.agreeButtonText}
          </Button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeHandler}>close</button>
      </form>
    </dialog>
  );
};
