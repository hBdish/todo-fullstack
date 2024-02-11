import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth';
import { UserModule } from './user';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
