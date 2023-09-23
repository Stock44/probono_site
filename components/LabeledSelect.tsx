"use client";
import React from "react";
import {
  Select as BaseSelect,
  type SelectOwnerState,
  type SelectProps,
} from "@mui/base/Select";
import { Option as BaseOption } from "@mui/base/Option";
import assert from "assert";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/ban-types
const SelectButton = React.forwardRef(function SelectButton<
  Multiple extends boolean,
>(
  {
    ownerState,
    children,
    ...props
  }: {
    values?: string[];
    labels?: string[];
    ownerState: SelectOwnerState<string | number, Multiple>;
  } & React.ComponentProps<"button">,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button {...props} ref={ref}>
      {children}
      <span className="material-symbols-rounded">
        {ownerState.open ? "arrow_drop_up" : "arrow_drop_down"}
      </span>
    </button>
  );
});

export const LabeledSelect = React.forwardRef(function Select<
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  Multiple extends boolean,
>(
  {
    label,
    required,
    values,
    labels,
    children,
    slotProps,
    className,
    ...props
  }: {
    label: string;
    values: Array<string | number>;
    labels?: string[];
  } & SelectProps<string | number, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  if (labels != null) assert(values.length === labels.length);

  const actualValues = required === true ? values : [null, ...values];
  const actualLabels =
    labels === undefined
      ? undefined
      : required === true
      ? labels
      : [props.placeholder, ...labels];

  return (
    <label className={clsx("mb-4", className)}>
      <p className="text-stone-300 text-xs pb-1">
        {label}
        {required === true ? "*" : null}
      </p>
      <BaseSelect<string | number, Multiple>
        {...props}
        required={required}
        ref={ref}
        slots={{
          root: SelectButton,
        }}
        slotProps={{
          ...slotProps,
          root: {
            className:
              "bg-stone-700 rounded flex justify-between p-1 w-full text-sm",
          },
          popper: {
            className: "shadow-md",
          },
          listbox: {
            className: "rounded bg-stone-700 mt-2 border-stone-600 border",
          },
        }}
      >
        {actualValues.map((value, idx) => (
          <BaseOption
            key={value}
            value={value}
            slotProps={{
              root: {
                className:
                  "hover:bg-stone-600 hover:text-stone-100 p-1 dark:text-stone-200",
              },
            }}
          >
            {actualLabels != null ? actualLabels[idx] : value}
          </BaseOption>
        ))}
      </BaseSelect>
    </label>
  );
});
