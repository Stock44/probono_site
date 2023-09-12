import React from "react";
import { type InputHTMLAttributes } from "react";

export default function TextInput({
  label,
  issueText,
  type = "text",
  ...rest
}: {
  label: string;
  issueText?: string;
  type?: "text" | "email" | "tel";
} & InputHTMLAttributes<any>) {
  return (
    <label className="flex flex-col gap-1 mb-4">
      <p className="text-xs text-stone-800 dark:text-stone-300">{label}</p>
      <input
        type={type}
        className="border-1 dark:bg-stone-700 dark:border-stone-600 rounded-sm text-stone-50"
        {...rest}
      />
      {issueText != null ? (
        <p className="text-red-400 text-xs"> {issueText}</p>
      ) : null}
    </label>
  );
}
