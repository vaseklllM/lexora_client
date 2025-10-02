import { sleep } from "@/shared/utils/sleep";
import { memo, ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";

type Status = "success" | "error";

const classesSlots = tv({
  slots: {
    option:
      "bg-base-100 text-base-content hover:bg-base-200 cursor-pointer rounded-lg p-3 text-sm",
  },
  variants: {
    status: {
      success: {
        option: "bg-success text-success-content hover:bg-success cursor-auto",
      },
      error: {
        option: "bg-error text-error-content hover:bg-error cursor-auto",
      },
    },
  },
});

interface Props {
  className?: string;
  title: string;
  id: string;
  onClick?: (args: { id: string }) => void;
  isRightOption: boolean;
}

export const OptionButton = memo((props: Props): ReactElement => {
  const [status, setStatus] = useState<Status>();

  const classes = classesSlots({
    status,
  });

  const clickHandler = useCallback(async () => {
    if (props.isRightOption) {
      setStatus("success");
      await sleep(800);
      props.onClick?.({ id: props.id });
      setStatus(undefined);
    } else {
      setStatus("error");
      await sleep(800);
      setStatus(undefined);
    }
  }, [props.onClick, props.id, props.isRightOption]);

  return (
    <button
      className={classes.option()}
      onClick={clickHandler}
      disabled={status === "success" || status === "error"}
    >
      {props.title}
    </button>
  );
});

OptionButton.displayName = "OptionButton";
