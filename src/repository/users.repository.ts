import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { Database } from './database';
import { User } from './types/db';

@Injectable()
export class UsersRepository {
  constructor(private readonly database: Database) {}

  async findById(id: string): Promise<Selectable<User> | undefined> {
    return await this.database
      .getInstance()
      .selectFrom('user')
      .where('id' as any, '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async findByEmail(email: string): Promise<Selectable<User> | undefined> {
    return await this.database
      .getInstance()
      .selectFrom('user')
      .where('email' as any, '=', email)
      .selectAll()
      .executeTakeFirst();
  }

  async create(
    userData: Insertable<User>,
  ): Promise<Selectable<User> | undefined> {
    return await this.database
      .getInstance()
      .insertInto('user')
      .values(userData)
      .returningAll()
      .executeTakeFirst();
  }
  //   update(id: string, userData: UpdateUserData): Promise<User>;
  //   delete(id: string): Promise<void>;
  //   findAll(filters?: UserFilters): Promise<User[]>;
}
