import { BadRequestException, Injectable } from '@nestjs/common';
import { Selectable } from 'kysely';
import { User } from 'src/repository/types/db';
import { UsersRepository } from 'src/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { RegisterDto, ROLES } from 'src/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(userData: RegisterDto): Promise<Selectable<User> | undefined> {
    const alreadyExists = await this.usersRepository.findByEmail(
      userData.email,
    );
    if (alreadyExists) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      role: ROLES.USER,
    });
    if (!newUser) {
      throw new BadRequestException('Failed to register user');
    }
    return newUser;
  }
}
