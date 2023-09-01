import pgPromise, {IDatabase} from 'pg-promise';
import {IClient} from 'pg-promise/typescript/pg-subset';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

interface Entity<T extends string> extends Record<string, any> {
    id: number | bigint | string
    table_name: T
}

type HydratableKeys<E extends Entity<string>> = keyof {
    [K in keyof E as E[K] extends Entity<string> | Entity<string>[] ? K : never]: E[K]
}[]

export interface Repository<E extends Entity<string>> {
    get(id: E['id'], hydrate: HydratableKeys<E>): Promise<E | null>;

    create(data: Omit<E, 'id' | 'table_name'>): Promise<E>;

    update(id: E['id'], diff: Partial<Omit<E, 'id' | 'table_name'>>): Promise<E>;

    drop(id: E['id']): Promise<void>;
}

export function get_repository_factory<E extends Entity<string>>(table_name: E['table_name']) {
    return function get_repository(db: IDatabase<{}, IClient>): Repository<E> {
        return {
            async create(data) {
                const keys = Object.keys(data);
                const values = Object.values(data);
                console.log('keys and values:')
                console.log(keys)
                console.log(values)
                return await db.one('insert into ${table_name~}(${keys~}) values (${values:csv}) returning *',
                    {
                        table_name,
                        keys,
                        values,
                    });
            },

            async get(id, hydrate) {
                // todo implement hydration
                try {
                    return await db.one('select * from ${table_name~} where id = ${id}',
                        {
                            table_name,
                            id,
                        });
                } catch (e) {
                    if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                        return null;
                    }
                    throw e;
                }

            },

            async update(id, diff) {
                const keys = Object.keys(diff);
                const values = Object.values(diff);
                return await db.one('update ${table_name~} set (${keys~}) = (${values:csv}) where id = ${id}',
                    {
                        table_name,
                        keys,
                        values,
                        id,
                    })
            },

            async drop(id) {
                await db.none('delete from ${table_name~} where id = ${id}', {
                    table_name,
                    id,
                })
            }
        }
    }

}


