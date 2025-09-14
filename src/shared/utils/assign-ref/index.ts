import { Ref } from "react";

export function assignRef<T>(...refs: (Ref<T> | undefined)[]) {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref && "current" in ref) {
        ref.current = instance;
      }
    });
  };
}
