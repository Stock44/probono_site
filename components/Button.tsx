import React, { type ButtonHTMLAttributes } from "react";

export default function Button({
  disabled,
  ...rest
}: ButtonHTMLAttributes<any>) {
  return (
    <button
      className="dark:bg-stone-700 p-2 text-stone-200 rounded-sm hover:bg-stone-600 text-xs"
      {...rest}
    />
  );
}
