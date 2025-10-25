import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/repository/users.repository';
import { Database } from 'src/repository/database';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, Database],
})
export class AuthModule {}
