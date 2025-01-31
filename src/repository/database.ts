/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseTypes } from './types/wrapper';

@Injectable()
export class Database implements OnModuleInit {
  private db: Kysely<DatabaseTypes>;

  onModuleInit(): any {
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        port: 5432,
        max: 10,
      }),
    });
    this.db = new Kysely<DatabaseTypes>({
      dialect,
    });
  }

  public getInstance(): Kysely<DatabaseTypes> {
    return this.db;
  }
}
