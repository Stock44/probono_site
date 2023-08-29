import {Pool} from 'pg';

let db: Pool | null = null;

const config = {
    connectionString: process.env.POSTGRES_URL + '?sslmode=require',
}

export default function getDb(): Pool {
    if (db) {
        return db;
    }

    db = new Pool(config);

    return db;
}
