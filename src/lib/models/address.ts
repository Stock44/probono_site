import prisma from '@/lib/prisma.ts';

export async function getAddress(id: number) {
	const baseAddress = await prisma.address.findUnique({
		where: {
			id,
		},
	});

	if (!baseAddress) {
		return null;
	}

	const rawResult = (await prisma.$queryRaw`
        select ARRAY[location[0], location[1]] as location from "Address" where id = ${id}
    `) as Array<{location: [number, number]}>;

	if (rawResult.length === 0) {
		return null;
	}

	return {
		...baseAddress,
		...rawResult[0],
	};
}
