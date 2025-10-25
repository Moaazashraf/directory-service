import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Selectable } from 'kysely';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { User } from 'src/repository/types/db';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const token = await this.authService.login(body);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: any): any {
    return {
      message: 'This is your profile',
      user: {
        id: user.sub,
        email: user.email,
        role: user.role,
      },
    };
  }
}
