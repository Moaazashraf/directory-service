import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface DatabaseTypes {
  user: UserTable;
}

export interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
