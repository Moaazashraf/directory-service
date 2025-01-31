import { PostgresDialect } from 'kysely';
import { defineConfig } from 'kysely-ctl';
import { Pool } from 'pg';

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      port: 5432,
      max: 10,
    }),
  }),
  migrations: {
    migrationFolder: './src/migrations',
  },
  plugins: [],
  seeds: {
    seedFolder: 'seeds',
  },
});
