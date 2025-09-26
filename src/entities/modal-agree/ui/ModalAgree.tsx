import { withModalRenderController } from "@/shared/hoc/with-modal-render-controller";
import { Button } from "@/shared/ui/Button";
import { sleep } from "@/shared/utils/sleep";
import { ReactElement, useCallback } from "react";

export type ModalAgreeOnAgree = (args: {
  closeModal: () => Promise<void>;
}) => void | Promise<void>;

interface ModalAgreeProps {
  className?: string;
  isOpen: boolean;
  onCloseModal: () => void;
  title?: string;
  description?: string;
  cancelButtonText?: string;
  agreeButtonText?: string;
  onAgree?: ModalAgreeOnAgree;
}

export const ModalAgree = withModalRenderController(
  (props: ModalAgreeProps): ReactElement => {
    const agreeHandler = useCallback(async () => {
      await props.onAgree?.({
        closeModal: async () => {
          props.onCloseModal();
          await sleep(200);
        },
      });
    }, [props.onAgree, props.onCloseModal]);

    return (
      <dialog
        className="modal"
        open={props.isOpen}
        onClose={props.onCloseModal}
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">{props.title}</h3>
          <p className="py-4">{props.description}</p>
          <div className="flex justify-end gap-4">
            <Button className="btn-soft" onClick={props.onCloseModal}>
              {props.cancelButtonText}
            </Button>
            <Button className="btn-error" onClick={agreeHandler}>
              {props.agreeButtonText}
            </Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={props.onCloseModal}>close</button>
        </form>
      </dialog>
    );
  },
);
