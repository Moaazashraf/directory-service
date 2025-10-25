import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Selectable } from 'kysely';
import { User } from 'src/repository/types/db';
import { UsersRepository } from 'src/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { RegisterDto, ROLES } from 'src/dtos/register.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(loginData: LoginDto): Promise<string> {
    const user = await this.usersRepository.findByEmail(loginData.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    try {
      const payload = { email: user.email, sub: user.id, role: user.role };
      const token: string = this.jwtService.sign(payload);
      return token;
    } catch (err) {
      this.logger.error('Failed to generate JWT token', err);
      throw new BadRequestException('Failed to generate token');
    }
  }
}
