import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('file')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('type', 'varchar(100)', (col) => col.notNull())
    .addColumn('size', 'varchar(100)', (col) => col.notNull())
    .addColumn('path', 'text', (col) => col.notNull())
    .addColumn('uploaded_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('uploaded_by', 'uuid', (col) => col.notNull())
    .addForeignKeyConstraint(
      'file_uploaded_by_fk',
      ['uploaded_by'],
      'user',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('file').execute();
}
