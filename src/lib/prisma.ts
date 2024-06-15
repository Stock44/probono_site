import {Pool, neonConfig} from '@neondatabase/serverless';
import {PrismaNeon} from '@prisma/adapter-neon';
import {PrismaClient} from '@prisma/client';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	neonConfig.webSocketConstructor = ws;

	const connectionString = `${process.env.DATABASE_URL}`;

	const pool = new Pool({connectionString});

	const adapter = new PrismaNeon(pool);

	prisma = new PrismaClient({adapter});
} else {
	const prismaClientSingleton = () => new PrismaClient();

	// @ts-expect-error untyped
	prisma = globalThis.prismaGlobal as PrismaClient ?? prismaClientSingleton();

	// @ts-expect-error untyped
	globalThis.prismaGlobal = prisma;
}

export default prisma;
