import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [UsersModule, AuthModule, FilesModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
