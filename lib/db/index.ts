import pgPromise from 'pg-promise';

const initOptions = {}
const pgp = pgPromise(initOptions)

pgp.pg.types.setTypeParser(20, BigInt); // Type Id 20 = BIGINT | BIGSERIAL

const connectionString = process.env.POSTGRES_URL + '?sslmode=require';

export const db = pgp(connectionString)
