import {type NextRequest, NextResponse} from 'next/server';
import {notFound} from 'next/navigation';
import prisma from '@/lib/prisma.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function GET(request: NextRequest) {
	const name = request.nextUrl.searchParams.get('name');

	if (name === null) {
		return new NextResponse('Missing name search parameter', {
			status: 400,
		});
	}

	const municipality = await prisma.municipality.findFirst({
		where: {
			name,
		},
	});

	if (!municipality) {
		notFound();
	}

	return NextResponse.json(municipality);
}
