import clsx from "clsx";

export default function Icon({
  iconName,
  className,
}: {
  className?: string;
  iconName: string;
}) {
  return (
    <span className={clsx("material-symbols-rounded", className)}>
      {iconName}
    </span>
  );
}
