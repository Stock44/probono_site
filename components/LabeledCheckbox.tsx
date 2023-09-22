"use client";
import React from "react";
import { Root, Indicator, type CheckboxProps } from "@radix-ui/react-checkbox";

export default function LabeledCheckbox({
  label,
  className,
  ...props
}: { label: string } & CheckboxProps) {
  return (
    <div className={className}>
      <label className="flex gap-2 items-center">
        <Root
          {...props}
          className="w-6 h-6 bg-stone-700 border-stone-600 border rounded"
        >
          <Indicator className="material-symbols-rounded">check</Indicator>
        </Root>
        <p className="text-sm text-stone-300">{label}</p>
      </label>
    </div>
  );
}
