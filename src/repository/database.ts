/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DB } from './types/db';

@Injectable()
export class Database implements OnModuleInit {
  private db: Kysely<DB>;

  onModuleInit(): any {
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
      }),
    });
    this.db = new Kysely<DB>({
      dialect,
    });
  }

  public getInstance(): Kysely<DB> {
    return this.db;
  }
}
