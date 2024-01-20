export function formatInMxn(value: number) {
	const formatter = Intl.NumberFormat('es-MX', {
		style: 'currency',
		currency: 'MXN',
	});
	return formatter.format(value);
}
