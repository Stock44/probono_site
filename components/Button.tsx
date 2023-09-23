import React from "react";
import { Button as BaseButton, type ButtonProps } from "@mui/base";

export const Button = React.forwardRef(function Button(
  {
    label,
    iconName,
    iconPosition = "left",
    slotProps,
    ...buttonProps
  }: {
    iconName?: string;
    label: string;
    iconPosition?: "left" | "right";
  } & Omit<ButtonProps, "children" | "className">,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <BaseButton
      {...buttonProps}
      ref={ref}
      slotProps={{
        ...slotProps,
        root: {
          className:
            "dark:bg-stone-700 h-8 p-1 text-stone-200 rounded-sm hover:bg-stone-600 text-sm flex justify-between items-center",
        },
      }}
    >
      {iconName != null && iconPosition === "left" ? (
        <span className="material-symbols-rounded align-middle me-1">
          {iconName}
        </span>
      ) : null}
      {label}
      {iconName != null && iconPosition === "right" ? (
        <span className="material-symbols-rounded align-middle ms-1">
          {iconName}
        </span>
      ) : null}
    </BaseButton>
  );
});
