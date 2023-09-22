"use client";

import React, { type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { Button as BaseButton, prepareForSlot } from "@mui/base";

const className =
  "dark:bg-stone-700 h-8 p-1 text-stone-200 rounded-sm hover:bg-stone-600 text-sm flex justify-center items-center";

export const Button = React.forwardRef(function Button(
  {
    label,
    iconName,
    ...buttonProps
  }: { iconName?: string; label: string } & Omit<
    ButtonHTMLAttributes<any>,
    "children" | "className"
  >,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <BaseButton {...buttonProps} className={className} ref={ref}>
      {iconName != null ? (
        <span className="material-symbols-rounded align-middle me-1">
          {iconName}
        </span>
      ) : null}
      {label}
    </BaseButton>
  );
});

const LinkSlot = prepareForSlot(Link);

export const LinkButton = React.forwardRef(function LinkButton(
  {
    label,
    iconName,
    ...linkProps
  }: { iconName?: string; label: string } & Omit<
    React.ComponentProps<typeof Link>,
    "children" | "className"
  >,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <BaseButton
      {...(linkProps as any)}
      className={className}
      ref={ref}
      slots={{
        root: LinkSlot,
      }}
    >
      {iconName != null ? (
        <span className="material-symbols-rounded align-middle me-1">
          {iconName}
        </span>
      ) : null}
      {label}
    </BaseButton>
  );
});
