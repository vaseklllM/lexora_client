import { sleep } from "@/shared/utils/sleep";
import { memo, ReactElement, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";

type Status = "success" | "error" | "disabled";

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
      disabled: {
        option:
          "bg-base-100/60 text-base-content/60 hover:bg-base-200 hover:bg-base-100/60 cursor-auto",
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
  onMixRandomCards?: () => void;
  isLastCard?: boolean;
  isChecked?: boolean;
  onChecked?: (isChecked: boolean) => void;
}

export const OptionButton = memo((props: Props): ReactElement => {
  const [clickStatus, setCLickStatus] = useState<Status>();

  const status = useMemo((): Status | undefined => {
    if (clickStatus) return clickStatus;
    if (props.isChecked) return "disabled";
  }, [clickStatus, props.isChecked]);

  const classes = classesSlots({
    status,
  });

  const clickHandler = useCallback(async () => {
    if (props.isRightOption) {
      props.onChecked?.(true);
      setCLickStatus("success");
      await sleep(800);
      props.onClick?.({ id: props.id });
      if (props.isLastCard) return;
      props.onMixRandomCards?.();
      setCLickStatus(undefined);
      props.onChecked?.(false);
    } else {
      props.onChecked?.(true);
      setCLickStatus("error");
      await sleep(800);
      props.onMixRandomCards?.();
      setCLickStatus(undefined);
      props.onChecked?.(false);
    }
  }, [
    props.onClick,
    props.id,
    props.isRightOption,
    props.onMixRandomCards,
    props.isLastCard,
    props.onChecked,
  ]);

  return (
    <button
      className={classes.option()}
      onClick={clickHandler}
      disabled={
        status === "success" || status === "error" || status === "disabled"
      }
    >
      {props.title}
    </button>
  );
});

OptionButton.displayName = "OptionButton";
