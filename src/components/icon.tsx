import clsx from 'clsx';

export default function Icon({
	iconName,
	className,
}: {
	readonly className?: string;
	readonly iconName: string;
}) {
	return (
		<span className={clsx('material-symbols-rounded', className)}>
			{iconName}
		</span>
	);
}
