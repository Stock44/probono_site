import pgPromise from "pg-promise";
import { person } from "@/lib/models/person";
import { getRepositoryFactory } from "@/lib/repository/index";
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;
import { type Database } from "@/lib/db";

export const getPersonRepository = (db: Database) => ({
  ...getRepositoryFactory(person)(db),

  async getByAuthId(authId: string): Promise<Person | null> {
    try {
      return await db.one(
        "select * from $(tableName~) where authId = $(authId)",
        {
          tableName,
          authId,
        },
      );
    } catch (error) {
      console.log(error);
      console.log(
        `instanceof: ${error instanceof pgPromise.errors.QueryResultError}`,
      );
      const queryResultError = error as QueryResultError;
      if (queryResultError.code === queryResultErrorCode.noData) {
        return null;
      }

      throw error;
    }
  },
});
