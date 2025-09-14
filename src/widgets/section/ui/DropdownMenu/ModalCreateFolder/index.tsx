import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalCreateFolder = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <dialog
      id="my_modal_1"
      className={classes.base({ className: props.className })}
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Create Folder</h3>
        <div className="modal-action">
          <div className="flex gap-2">
            <Button className="" onClick={() => props.setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              btnType="primary"
              className=""
              onClick={(e) => {
                e.preventDefault();
                // Add your create folder logic here
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
