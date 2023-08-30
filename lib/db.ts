import {Pool, PoolClient} from 'pg';

let db: Pool | null = null;

const config = {
    connectionString: process.env.POSTGRES_URL + '?sslmode=require',
}

export default function getDb(): Promise<PoolClient> {
    if (db) {
        return db.connect();
    }

    db = new Pool(config);

    return db.connect()
}
