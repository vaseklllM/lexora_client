import { tv } from "tailwind-variants";

export const buttonClassesSlots = tv({
  slots: {
    base: "flex flex-col items-center justify-center gap-4",
    button: "h-22 w-22 md:h-22 md:w-22",
    title: "text-base-content/80 text-lg font-bold",
  },
  variants: {
    type: {
      repeat: {
        button: "dark:btn-soft btn-outline",
      },
      repeatAll: {
        button: "dark:btn-soft btn-outline btn-secondary",
      },
    },
  },
});
