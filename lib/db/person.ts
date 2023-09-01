import {get_repository_factory} from '@/lib/db/repository';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;
import {IClient} from 'pg-promise/typescript/pg-subset';

const tableName = 'person';

interface Person {
    id: bigint,
    table_name: typeof tableName
    auth_id: string,
    given_name: string,
    family_name: string,
    phone: string,
    email: string,
    org_position?: string,
    organization?: Organization
}

export const get_person_repository = (db: pgPromise.IDatabase<{}, IClient>) => {
    return {
        ...get_repository_factory<Person>(tableName)(db),
        async get_by_auth_id(auth_id: string): Promise<Person | null> {
            try {
                return await db.one(`select * from ${tableName} where auth_id = $(auth_id)`,
                    {
                        auth_id,
                    });
            } catch (e) {
                if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                    return null;
                }
                throw e;
            }
        }
    }
};



