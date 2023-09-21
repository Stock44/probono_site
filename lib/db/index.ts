import type pgPromise from "pg-promise";

const connectionString = process.env.POSTGRES_URL + "?sslmode=require";
// export type Database = pgPromise.IDatabase<unknown>;

const cn: pgPromise.IInitOptions = {
  capSQL: true,
};

const dbCn = {
  connectionString,
  max: 1,
};

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("probono.db");
const PGP_KEY = Symbol.for("probono.pgp");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.includes(DB_KEY);
if (!hasDb) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pgp = require("pg-promise")(cn);
  pgp.pg.types.setTypeParser(20, BigInt);
  // @ts-expect-error global object has any type
  global[PGP_KEY] = pgp;
  // @ts-expect-error global object has any type
  global[DB_KEY] = global[PGP_KEY](dbCn);
}

// Create and freeze the singleton object so that it has an instance property.
// @ts-expect-error properties will be defined with accesors
const singleton: {
  pgp: typeof pgPromise;
  db: pgPromise.IDatabase<unknown>;
} = {};
Object.defineProperty(singleton, "db", {
  get() {
    // @ts-expect-error global object has any type
    return global[DB_KEY];
  },
});
Object.defineProperty(singleton, "pgp", {
  get() {
    // @ts-expect-error global object has any type
    return global[PGP_KEY];
  },
});

export const db = singleton.db;
export const pgp = singleton.pgp;
export const errors = pgp.errors;
export type Database = pgPromise.IBaseProtocol<unknown>;
