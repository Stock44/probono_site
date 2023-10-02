import React from "react";
import {
  type NumberInputProps,
  Unstable_NumberInput as BaseNumberInput,
} from "@mui/base/Unstable_NumberInput";
import clsx from "clsx";

export const NumberInput = React.forwardRef(function NumberInput(
  {
    label,
    issueText,
    className,
    required,
    name,
    ...numberInputProps
  }: { label: string; issueText?: string; name?: string } & NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <label className={clsx("flex flex-col gap-1 mb-4 w-full", className)}>
      <p className="text-xs text-stone-800 dark:text-stone-300">
        {label}
        {required === true ? "*" : null}
      </p>
      <BaseNumberInput
        ref={ref}
        required
        className="border-1 w-full  border-stone-700 rounded text-stone-50 grid grid-rows-2 grid-cols-[1fr_16px]"
        slotProps={{
          input: {
            className:
              "row-span-2 col-span-1 order-1 bg-transparent p-2 text-sm w-full",
            name,
          },
          incrementButton: {
            children: "arrow_drop_up",
            className:
              "material-symbols-rounded order-2 h-4 flex justify-center items-center align-middle text-center",
          },
          decrementButton: {
            children: "arrow_drop_down",
            className:
              "material-symbols-rounded order-3 h-4 flex justify-center items-center align-middle text-center",
          },
        }}
        {...numberInputProps}
      />
      {issueText != null ? (
        <p className="text-red-400 text-xs"> {issueText}</p>
      ) : null}
    </label>
  );
});
