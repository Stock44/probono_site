import React, { type ButtonHTMLAttributes } from "react";
import Link from "next/link";

const className =
  "dark:bg-stone-700 p-2 text-stone-200 rounded-sm hover:bg-stone-600 text-xs";

export function Button({ disabled, ...rest }: ButtonHTMLAttributes<any>) {
  return <button className={className} disabled {...rest} />;
}

export function LinkButton({
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      <div className={className}>{children}</div>
    </Link>
  );
}
