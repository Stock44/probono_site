export function connectId(id: number | null | undefined) {
	return id
		? {
				connect: {
					id,
				},
			}
		: undefined;
}
