import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Selectable } from 'kysely';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { User } from 'src/repository/types/db';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<Selectable<User>> {
    const user = await this.authService.register(body);
    if (!user) {
      throw new BadRequestException('Failed to register user');
    }
    return user;
  }

  // @Post('login')
  // async login(@Body() body: LoginDto) {
  //     return await this.authService.login(body);
  // }
}
