import React from "react";
import { Input as BaseInput, type InputProps } from "@mui/base";
import clsx from "clsx";

export const LabeledInput = React.forwardRef(function Input(
  {
    label,
    issueText,
    required,
    className,
    ...inputProps
  }: {
    label: string;
    issueText?: string;
  } & Omit<InputProps, "slotProps" | "ref">,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <label className={clsx("flex flex-col gap-1, mb-4", className)}>
      <p className="text-xs text-stone-800 dark:text-stone-300">
        {label}
        {required === true ? "*" : null}
      </p>
      <BaseInput
        {...(inputProps as any)}
        ref={ref}
        required={required}
        slotProps={{
          input: {
            className:
              "border-1 dark:bg-stone-700 p-1 dark:border-stone-600 rounded-sm text-stone-50 h-8 text-sm w-full",
          },
        }}
      />
      {issueText != null ? (
        <p className="text-red-400 text-xs"> {issueText}</p>
      ) : null}
    </label>
  );
});
